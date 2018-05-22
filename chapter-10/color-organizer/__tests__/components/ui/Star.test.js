import { shallow } from 'enzyme'
import Star from '../../../src/components/ui/Star'

describe("<Star /> - UI Component", () => {

    it("renders default star", () => 
        // jQuery-like find('div.star')...of <div> with class "star"...
        expect(
           shallow(<Star />)
            .find('div.star')
            .length 
        ).toBe(1) 
    )

    it("renders selected stars", () => 
        expect(
           shallow(<Star selected={true} />)
            .find('div.selected.star')
            .length 
        ).toBe(1) 
    )

    it("invokes onClick", () => {

        // Create mock function _click using jest.fn...
        // supply it as Star's onClick property
        const _click = jest.fn() 

        // Use Enzyme's `simulate()` method
        // to simulate a click event on Star's
        // div...this faux click should invoke
        // the `onClick()` property, and, in turn,
        // invoke our mock function... 
        //
        // The .toBeCalled matcher can be used
        // to verify that a mock function was
        // invoked (this is a "spy", n'est-ce pas...?)
        shallow(<Star onClick={_click} />)
            .find('div.star')
            .simulate('click')

        expect(_click).toBeCalled()

        }
    )
})

