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
        it('set the DisplayName value into state',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your Display name');
            
            fireEvent.change(displayNameInput,changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
         });
         it('set the username value into state',() => {
            const { queryByPlaceholderText } =  render(<UserSignupPage />);
            const dusernameInput = queryByPlaceholderText('Your username');
            
            fireEvent.change(dusernameInput,changeEvent('my-user-name'));
            expect(dusernameInput).toHaveValue('my-user-name');
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
    });
});