import React from 'react';
import {render,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {UserSignupPage} from './UserSignupPage';

describe('UserSignupPage', () => {
    describe('Layout',() => {
        it('has header of Sign up',() => {
           const { container } =  render(<UserSignupPage />);
           const header = container.querySelector('h1');
           expect(header).toHaveTextContent('Sign Up');
        });
        it('has input for display name',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your Display name');
            expect(displayNameInput).toBeInTheDocument();
         });
         it('has input for username',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
         });
         it('has input for password',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
         });
         it('has password type for password input',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
         });
         it('has input for confirm password',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const confirmPasswordInput = queryByPlaceholderText('Repeat your password');
            expect(confirmPasswordInput).toBeInTheDocument();
         });
         it('has confirm password type for password input',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const confirmPasswordInput = queryByPlaceholderText('Repeat your password');
            expect(confirmPasswordInput.type).toBe('password');
         });
         it('has submiy button',() => {
            const { container } =  render(<UserSignupPage />);
            const button = container.querySelector('button')
            expect(button).toBeInTheDocument();
         });
    });
    describe('Interaction',() => {
        const changeEvent = (content) => {
                return {
                    target: {
                        value: content
                }
            };
        };

        let button,displayNameInput,usernameInput,passwordInput,repeatPasswordInput;

         const setupFormSubmit = (props) => {

            const rendered = render(<UserSignupPage {...props}/>);
            const {container, queryByPlaceholderText} = rendered;
            displayNameInput = queryByPlaceholderText('Your Display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            repeatPasswordInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput,changeEvent('my-display-name'));
            fireEvent.change(usernameInput,changeEvent('my-user-name'));
            fireEvent.change(passwordInput,changeEvent('P@ssword'));
            fireEvent.change(repeatPasswordInput,changeEvent('P@ssword'));
            button = container.querySelector('button');

            return rendered;
        }

        it('set the DisplayName value into state',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your Display name');
            
            fireEvent.change(displayNameInput,changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
         });
         it('set the username value into state',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            
            fireEvent.change(usernameInput,changeEvent('my-user-name'));
            expect(usernameInput).toHaveValue('my-user-name');
         });
         it('set the password value into state',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            
            fireEvent.change(passwordInput,changeEvent('P@ssword'));
            expect(passwordInput).toHaveValue('P@ssword');
         });
         it('set the repeat password value into state',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const repeatPasswordInput = queryByPlaceholderText('Repeat your password');
            
            fireEvent.change(repeatPasswordInput,changeEvent('P@ssword'));
            expect(repeatPasswordInput).toHaveValue('P@ssword');
         });
         it('call postSignup when the fields are valid and the action provided in props',() => {
            const actions = {
               postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupFormSubmit({actions});
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
         });
         it('does not throw exception when clicking he button when actions not provided in props ',() => {
            setupFormSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
            
         });
         it('calls post with user body hen he fields are valid ',() => {
            const actions = {
               postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupFormSubmit({actions});
            fireEvent.click(button);
            const exceptedUserObject = {
               username: 'my-user-name',
               displayName:'my-display-name',
               password:'P@ssword'
            }
            expect(actions.postSignup).toHaveBeenCalledWith(exceptedUserObject);
         });
    });
});