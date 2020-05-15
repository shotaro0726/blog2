import React, { Component } from 'react';
import $ from 'jquery';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
            title: this.props.title,
            content: this.props.content
        };
        this.editPost = this.editPost.bind(this);
        this.postDetails = this.postDetails.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
    }

    changeMode(event) {
        this.setState({
            mode: parseInt(event.target.name, 10)
        });
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdatePost(event) {
        event.preventDefault();
        this.props.handleFetch("PUT", {
            title: this.state.title,
            content: this.state.content,
            pk: this.props.pk
        });
        $(`#postDetailModal${this.props.pk}`).modal('hide');
    }

    handleDeletePost(event) {
        event.preventDefault();
        this.props.handleFetch("DELETE", {
            pk: this.props.pk
        });
        $(`#postDetailModal${this.props.pk}`).modal('hide');
    }

    deletePost() {
        return (
            <div>
                <div className="modal-header">
                    <h5 className="modal-title" id="postDetailModalLabel">しょうさい</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h4>投稿した内容を削除しますか？</h4>
                </div>
                <div className="modal-footer">
                    <button name="1" onClick={this.changeMode} type="button" id="saveButton" className="btn btn-primary mr-auto">へんしゅう</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">とじる</button>
                    <button type="button" onClick={this.handleDeletePost} className="btn btn-danger">さくじょ</button>
                </div>
            </div>
        )
    }

    editPost() {
        return (
            <form onSubmit={this.handleUpdatePost}>
                <div className="modal-header">
                    <h5 className="modal-title" id="postDetailModelLabel">編集</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&time;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <input maxLength="255" required value={this.state.title} name="title" onChange={this.handleTextChange} type="text" class="form-control" placeholder="たいとる"></input>
                    </div>
                    <div className="form-group">
                        <textarea required value={this.state.content} name="content" onChange={this.handleTextChange} type="text" class="form-control" placeholder="ないよう"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" name="2" onClick={this.changeMode} className="btn btn-danger mr-auto">さくじょ</button>
                    <button type="button" name="0" onClick={this.changeMode} className="btn btn-primary">しょうさい</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">とじる</button>
                    <button type="submit" id="saveButton" className="btn btn-primary">とうこう</button>
                </div>
            </form>
        );
    }

    postDetails() {
        return (
            <div>
                <div className="model-header">
                    <h5 className="model-title" id="postDetailModelLabel">しょうさい</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&time;</span>
                    </button>
                </div>
                <div className="model-body">
                    <h4 class="text-left">{this.state.title}</h4>
                    <hr></hr>
                    <p class="text-left preserveWhiteSpace">{this.state.content}</p>
                </div>
                <div className="model-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">とじる</button>
                    <button name="1" onClick={this.changeMode} type="button" id="saveButton" className="btn btn-primary">へんしゅう</button>
                </div>
            </div>
        );
    }

    render() {
        let renderPart = () => {
            switch (this.state.mode) {
                case 0:
                    return this.postDetails();
                case 1:
                    return this.editPost();
                case 2:
                    return this.deletePost();
                default:
            }
        }

        return (
            <div>
                <div className="model fade" id={`postDetailModal${this.props.pk}`} tabIndex="-1" role="dialog" aria-labelledby="postDetailModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            {renderPart()}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default PostDetail;