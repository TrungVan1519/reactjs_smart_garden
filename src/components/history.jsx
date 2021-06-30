import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class History extends Component {
  state = {
    posts: [],
    apiEndpoint: "https://jsonplaceholder.typicode.com/posts",
  };

  async componentDidMount() {
    // pending > resolved (success) || rejected (failure)
    const response = await axios.get(this.state.apiEndpoint);
    const posts = [...response.data];
    this.setState({ posts });

    toast.info(response.status);
  }

  handleAdd = async () => {
    const newObject = { title: "NEW TITLE", body: "NEW BODY" };

    const response = await axios.post(this.state.apiEndpoint, newObject);
    const posts = [response.data, ...this.state.posts];
    this.setState({ posts });

    toast.success(response.status);
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED TITLE";

    const response = await axios.put(
      this.state.apiEndpoint + "/" + post.id,
      post
    );
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });

    toast.success(response.status);
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(this.state.apiEndpoint + "/" + post.id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("This post has already been deleted");
      } else {
        alert('unexpected error occurs')
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>History</h1>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default History;
