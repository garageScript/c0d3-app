import initStoryshots from '@storybook/addon-storyshots'

/*	
	This mock is necessary because there is currently a problem
	with taking storyshots of Modals. See here for more info:
	https://github.com/storybookjs/storybook/issues/2822

*/
jest.mock('react-bootstrap/Modal', () => {
  return props => (props.isOpen ? props.children : null)
})
//ModalImage storyshot is skipped because it's causing errors
//TO-DO find a way to integrate modals into storybook properly

initStoryshots({
  storyKindRegex: /^((?!.*?ModalImage).)*$/
})
