import React, { Component } from 'react';
import PostDetail from './PostDetail';
import './Post.css';

class Post extends Component {
    render() {
        return (
            <div>
                <PostDetail pk={this.props.pk} content={this.props.content} created={this.props.created} title={this.props.title} handleFetch={this.props.handleFetch} />
                <div className="postBlock" data-toggle="model" data-target={`#postDetailModel${this.props.pk}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-7 text-left">{this.props.title}</div>
                            <div className="col-5 text-right">{this.props.created}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;