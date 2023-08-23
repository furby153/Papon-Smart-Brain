import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    onEmailChange = (event) => {
        const email = event.target.value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (emailPattern.test(email) || email === '') {
            this.setState({ email });
        }
    };
    

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    onSubmitRegister = async () => {
        try {
            const { name, email, password } = this.state;

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
    
            if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields.');
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
                if (this.validateEmail()) {
                    nextInputRef.current.focus();
                } else {
                    alert('Please enter a valid email address.');
                }
            } else if (action === 'submit') {
                this.onSubmitRegister();
            }
        }
    };

    validateEmail = () => {
        const { email } = this.state;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailPattern.test(email)) {
            return true;
        }
        return false;
    };

    render() {
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
                </main>
            </article>
        ); 
    }  
}

export default Register;