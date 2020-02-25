import { shallowMount } from '@vue/test-utils'
import RegisterCard from '@/components/RegisterCard'

describe('RegisterCard', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(RegisterCard, {
    })
  })

  test('Expect email to be valid', () => {
    const validMail = 'test@test.com'
    expect(wrapper.vm.validateEmail(validMail)).toBeTruthy()
  })

  test('Expect email to be invalid', () => {
    const invalidEmail = 'test-invalid-mail.nl'
    expect(wrapper.vm.validateEmail(invalidEmail)).toBeFalse()
  })
})
