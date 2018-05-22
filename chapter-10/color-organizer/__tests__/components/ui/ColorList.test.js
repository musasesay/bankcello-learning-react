/** Write a test for `ColorList`
* that replaces the `Color` component
* with a mock...
*/
import { mount } from 'enzyme'
import ColorList from '../../../src/components/ui/ColorList'

// jest.mock(): injects a mock in place of the actual
// Color component.
//
// jest.mock(component_we_wish_to_mock, function_that_returns_the_mocked_component)
//
// In this case, we only mock the properties
// related to rating a color...
jest.mock('../../../src/components/ui/Color', () => 
    ( { rating, onRate=f=>f}) => 
    <div className="mock-color">
        <button className="rate" onClick={() => onRate(rating)} />
    </div>
)

// Send the global _testColors which was a deepFreeze() of
// an array of color objects...(see __tests__/global.js...)
describe("<ColorList /> - UI Component", () => {

    describe("Rating a Color", () => {

        let _rate = jest.fn()

        beforeAll( () => 
            mount(<ColorList colors={_testColors} onRate={_rate} />)
            .find('button.rate')
            .first()
            .simulate('click')
        )

        it("invokes onRate Handler", () => 
            expect(_rate).toBeCalled()
        )

        it("rates the correct color", () =>
            expect(_rate).toBeCalledWith(
                "8658c1d0-9eda-4a90-95e1-8001e8eb6036",4)
        )
    })
})
