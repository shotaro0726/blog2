import React, { Component } from 'react';
import $ from 'jquery';

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: ""
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreatePost(event) {
        event.preventDefault();
        this.props.handleFetch("POST", this.state);
        $("#createPostModel").model('hide');
        this.setState({ title: "", content: "" });
    }

    render() {
        return (
            <div>
                <div className="model fade" id="createPostModel" tabIndex="-1" role="dialog" aria-labelledby="createPostModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="createPostModalLabel">とうこー</h5>
                                <button type="button" className="close" data-dismiss="model" aria-label="Close">
                                    <span aria-hidden="true">&time;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleCreatePost}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input maxLength="255" required value={this.state.title} name="title" onChange={this.handleTextChange} type="text" className="form-control" placeholder="たいとる"></input>
                                    </div>
                                    <div className="form-group">
                                        <textarea maxLength="255" required value={this.state.content} name="title" onChange={this.handleCreatePost} type="text" className="form-control" placeholder="ないよう"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">とじる</button>
                                    <button type="submit" id="saveButton" className="btn btn-primary" data-dismiss="modal">ほぞん</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePost;