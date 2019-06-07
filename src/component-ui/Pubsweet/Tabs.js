import { compose, withStateHandlers } from 'recompose'

const Tabs = ({ items, selectedTab = 1, changeTab, children }) =>
  children({ selectedTab, changeTab })

export default compose(
  withStateHandlers(({ selectedTab = 1 }) => ({ selectedTab }), {
    changeTab: () => selectedTab => ({
      selectedTab,
    }),
  }),
)(Tabs)
