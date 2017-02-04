
const defaultState = {todos:
  [{
    id: 1,
    text: '下拉添加新任务',
    completed: false,
    time: 0,
  }, {
    id: 2,
    text: '右滑标记为完成',
    completed: false,
    time: 0,
  }, {
    id: 3,
    text: '左滑修改或删除',
    completed: false,
    time: 0,
  }, {
    id: 4,
    text: '上拉查看历史',
    completed: false,
    time: 0,
  }]
}

export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) {
    saveState(defaultState);
    return defaultState;
  }

  return JSON.parse(serializedState);
}

export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}
