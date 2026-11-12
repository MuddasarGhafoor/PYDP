const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Load the actual store in isolated browser-like contexts without a test dependency.
function createStore(saved = null, storageFails = false) {
  let stored = saved;
  const events = new Map();
  const modules = {};
  function load(name) {
    if (modules[name]) return modules[name];
    const code = ts.transpileModule(fs.readFileSync(`src/lib/${name}.ts`, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const exports = {};
    vm.runInNewContext(code, {
      exports,
      require: () => load('content'),
      localStorage: {
        getItem: () => stored,
        setItem: (_, value) => { if (storageFails) throw Error('Quota exceeded'); stored = value; },
      },
      window: {
        addEventListener: (name, listener) => events.set(name, listener),
        removeEventListener: name => events.delete(name),
      },
    });
    modules[name] = exports;
    return exports;
  }
  return { store: load('store'), events, get stored() { return stored; }, set stored(value) { stored = value; } };
}

test('opens malformed browser storage without crashing or inventing progress', () => {
  const { store } = createStore('{broken');
  assert.equal(store.getSnapshot().submitted, false);
  assert.equal(store.getSnapshot().completed.length, 0);
  assert.equal(store.getSnapshot(), store.getSnapshot());
});

test('retains a legacy HTML draft, exercises, student and review status', () => {
  const legacy = { answers: { topic: 'Career guidance', ready0: true }, lessonAnswers: { 0: 'A focused problem' }, completed: [0, 0, 2, -1, 9, '1'], submitted: true, status: 'BLUE', student: { name: 'Sample Student', institution: 'Sample University' }, revision: true, revisionNote: 'Added evidence' };
  const { store } = createStore(JSON.stringify(legacy));
  const state = store.getSnapshot();
  assert.equal(store.answer(state, 'topic'), 'Career guidance');
  assert.equal(state.answers.ready0, true);
  assert.deepEqual(Array.from(state.completed), [0, 2]);
  assert.equal(state.lessonAnswers[0], 'A focused problem');
  assert.equal(state.status, 'BLUE');
  assert.equal(state.student.name, 'Sample Student');
  assert.equal(state.revisionNote, 'Added evidence');
});

test('saves changes, notifies subscribers and keeps server snapshot empty', () => {
  const app = createStore(); let notifications = 0;
  const unsubscribe = app.store.subscribe(() => notifications++);
  assert.equal(app.store.updateState(s => ({ ...s, answers: { topic: 'A new brief' } })), true);
  assert.equal(JSON.parse(app.stored).answers.topic, 'A new brief');
  assert.equal(notifications, 1);
  assert.equal(app.store.answer(app.store.getServerSnapshot(), 'topic'), '');
  unsubscribe();
  assert.equal(app.events.size, 0);
});

test('keeps changes in memory and reports failure when storage is blocked', () => {
  const { store } = createStore(null, true);
  assert.equal(store.updateState(s => ({ ...s, answers: { topic: 'Unsaved brief' } })), false);
  assert.equal(store.answer(store.getSnapshot(), 'topic'), 'Unsaved brief');
});

test('refreshes the visible state when another tab updates or clears storage', () => {
  const app = createStore(); let notifications = 0;
  app.store.subscribe(() => notifications++);
  app.stored = JSON.stringify({ answers: { topic: 'Updated in another tab' } });
  app.events.get('storage')({ key: 'pydp_demo' });
  assert.equal(app.store.answer(app.store.getSnapshot(), 'topic'), 'Updated in another tab');
  app.stored = null;
  app.events.get('storage')({ key: null });
  assert.equal(app.store.answer(app.store.getSnapshot(), 'topic'), '');
  assert.equal(notifications, 2);
});
