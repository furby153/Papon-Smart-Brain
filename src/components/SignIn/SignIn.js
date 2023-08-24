import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            signInStatus: '',
            emailPatternStatus: '',
        };
        this.passwordInputRef = React.createRef();
    }

    isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    onEmailChange = (event) => {
        const email = event.target.value;
        const isValid = this.isEmailValid(email) || email === '';
    
        this.setState({
            emailPatternStatus: isValid ? '' : 'error',
            signInEmail: email,
            signInStatus: ''
        });
    };
    

    onPasswordChange = (event) => {
        this.setState({ 
            signInPassword: event.target.value ,
            signInStatus: ''
        });
    };

    onSubmitSignIn = async () => {
        try {
            const { signInEmail, signInPassword } = this.state;

            if (!this.isEmailValid(signInEmail)) {
                this.setState({signInStatus: 'error'});
                return;
            }

            const response = await fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword,
                }),
            });

            const user = await response.json();
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({ signInStatus: 'error' }); // Set status to 'error' on unsuccessful sign-in
            }
        } catch (error) {
            console.error('Error signing in:', error);
            this.setState({ signInStatus: 'error' }); // Set status to 'error' on error
        } finally {
            this.setState({ signInPassword: '' }); // Clear password field regardless of the outcome
        }
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.target.id === 'email-address') {
                this.passwordInputRef.current.focus();
            } else if (event.target.id === 'password') {
                this.onSubmitSignIn();
            }
        }
    };

    render() {
        const { onRouteChange } = this.props;
        const { signInStatus, emailPatternStatus } = this.state;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                    Email
                                </label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    onKeyDown={this.handleKeyPress}
                                />
                                {emailPatternStatus === 'error' && (
                                    <p className="red">Please enter a valid email address.</p>
                                )}
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    ref={this.passwordInputRef}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={this.state.signInPassword}
                                    onChange={this.onPasswordChange}
                                    onKeyDown={this.handleKeyPress}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                onClick={() => onRouteChange('register')}
                                className="f6 link dim black db pointer"
                            >
                                Register
                            </p>
                        </div>
                    </div>
                    {signInStatus === 'error' && (
                        <p className="red">Sign-in failed. Please check your credentials.</p>
                    )}
                </main>
            </article>
        );
    }
}

export default SignIn;