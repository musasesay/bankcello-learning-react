/* Our manual ColorListMock: simply renders an empty <div> element...
* Now whenever we mock the ColorList component with `jest.mock()`,
* Jest will obtain the appropriate mock from the __mocks__ folder.
* We do not have to define the mock directly in our test.
*/
const ColorListMock = () => <div></div>

ColorListMock.displayName = "ColorListMock"

export default ColorListMock
