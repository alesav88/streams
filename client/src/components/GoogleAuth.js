import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component{


    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '623701756152-4d1fgan1g9mp54ct1f1soi4btsrvmd9m.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return <div>null</div>;
        } else if (this.props.isSignedIn){
            return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                SignOut
            </button>);
        } else {
            return(
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    SignIn with Google
                </button>
            );
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStatetoPropos = (state) =>{
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStatetoPropos, {signIn, signOut})(GoogleAuth);