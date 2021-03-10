export interface LayoutState {
  title: string;
}

function state(): LayoutState {
  return {
    title: 'Overview',
  }
};

export default state;
