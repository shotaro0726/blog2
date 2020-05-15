import React, { Component } from 'react';
import CreatePost from './CreatePost';
import Post from './Post';

class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
        this.handleFetch = this.handleFetch.bind(this);
    }

    handleFetch(method, data) {
        let options = {
            method: method,
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }

        if (method === "GET") delete options.body;

        fetch("api/posts/", options)
            .then(res => res.json())
            .then(obj => {
                if (method === "POST") {
                    this.setState({ posts: [...this.state.posts, obj] })
                } else if (method === "GET") {
                    this.setState({ posts: obj })
                } else if (method === "PUT") {
                    this.setState((prev) => {
                        let index = prev.posts.findIndex(item => item.pk === obj.pk);
                        prev.posts.splice(index, 1);
                        return prev;
                    });
                } else {
                    alert("無効なメソッド");
                }
            })
            .catch(() => alert("問題が発生しました"));
    }

    componentDidMount() {
        this.handleFetch("GET");
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <div className="jumbotron text-center">
                        <CreatePost handleFetch={this.handleFetch} />
                        <h1>めも</h1>
                        <br></br>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createPostModal">
                            めもさくせい
                        </button>
                        <div className="container pullMargin">
                            <br></br>
                            <div className="row">
                                <div className="col-7 text-left">たいとる</div>
                                <div className="col-5 text-right">さくせい</div>
                            </div>
                        </div>
                        <hr></hr>
                        {this.state.posts.length > 0 ?
                            <div className="postContainer">
                                {this.state.posts.map(
                                    item => <Post
                                        key={item.pk}
                                        pk={item.pk}
                                        content={item.content}
                                        created={item.created}
                                        title={item.title}
                                        handleFetch={this.handleFetch}
                                    />).reverse()}
                            </div>
                            :
                            <h4>投稿は作成されていません</h4>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PostList;