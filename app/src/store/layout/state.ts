export interface LayoutState {
  title: string;
}

function state(): LayoutState {
  return {
    title: 'Sample Title'
  }
};

export default state;
