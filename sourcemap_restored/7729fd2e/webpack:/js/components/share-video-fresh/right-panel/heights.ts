// TODO(next author): colocate to pages/share/common
export const getTabsHeight = (): number => {
  const el = document.getElementById('right-panel-tabs');

  return el?.getBoundingClientRect().height || 0;
};

export const getCommentTabHeaderHeight = (): number => {
  const el = document.getElementById('comments-tab-header');

  return el?.getBoundingClientRect().height || 0;
};
