import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            registerStatus: '',
            emailPatternStatus: '',
        };
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value , registerStatus: '' });
    };

    onEmailChange = (event) => {
        const email = event.target.value;
        const isValid = this.isEmailValid(email) || email === '';

        this.setState({
            emailPatternStatus: isValid ? '' : 'error',
            email: email,
            registerStatus: ''
        });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value , registerStatus: ''  });
    };

    onSubmitRegister = async () => {
        try {
            const { name, email, password } = this.state;
    
            if (name.trim() === '' 
                || email.trim() === '' 
                || password.trim() === '' 
                || !this.isEmailValid(email)
                ) {
                this.setState({registerStatus: 'error'});
                return;
            }
            
            const response = await fetch('http://localhost:3000/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            
            if (response.status === 400) {
                const errorMessage = await response.json();
                if (errorMessage === 'Email already exists') {
                    this.setState({ registerStatus: 'email-exists' });
                    return;
                }
            }

            const user = await response.json();
            if (user) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
         
        } catch (error) {
            console.error('Error Registerating:', error);
        }
    };
    

    handleKeyDown = (event, nextInputRef, action) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (action === 'move') {
                nextInputRef.current.focus();
            } else if (action === 'submit') {
                this.onSubmitRegister();
            }
        }
    };

    render() {
        const { registerStatus, emailPatternStatus } = this.state;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}
                                    onKeyDown={(event) => this.handleKeyDown(event, this.emailInputRef, 'move')}
                                />
                            </div>
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="email-address"
                                >
                                    Email
                                </label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    ref={this.emailInputRef}
                                    onKeyDown={(event) => this.handleKeyDown(event, this.passwordInputRef, 'move')}
                                />
                            </div>
                            <div className="mv3">
                                <label 
                                    className="db fw6 lh-copy f6"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    ref={this.passwordInputRef}
                                    onKeyDown={(event) => this.handleKeyDown(event, null, 'submit')}
                                />
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                            />
                        </div>
                    </div>
                    {registerStatus === 'error' && (
                        <p className="red">Register failed. Please fill out all fields.</p>
                    )}
                    {emailPatternStatus === 'error' && (
                        <p className="red">Please enter a valid email address.</p>
                    )}
                    {registerStatus === 'email-exists' && (
                        <p className="red">Email is already exists.</p>
                    )}
                </main>
            </article>
        ); 
    }  
}

export default Register;