import React from 'react';
import { findDOMNode } from 'react-dom';

import axios from 'axios';

import { StickyComment } from './StickyComment';
import { TempComment } from './TempComment';
import '../../SASS/StickyComment.scss';

const uuidv1 = require('uuid/v1');

export class ImageWithComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      tempComments: [],
      activeImg: this.props.activeImg
    };
    this.element = null;
    this.width = null;
    this.height = null;
    this.left = null;
    this.leftOffset = null;
    this.top = null;
    this.topOffset = null;
  }

  render() {
    const { id, url } = this.props.activeImg;
    const { comments, tempComments } = this.state;
    console.log('ImageWithComments.js render() comments', comments);
    let activeComments = comments.filter(c => c.imageId === id);
    console.log('ImageWithComments.js render() activeComments', activeComments);
    let activeTemp = tempComments.filter(c => c.imageId === id);
    console.log('ImageWithComments.js render() tempComments', tempComments);
    return (
      <div className="ImageWithComments">
        <img
          alt={url}
          className="ImageWithComments__full-img"
          onClick={e => this.handleClick(e, id)}
          // onMouseMove={this.onMouseMove}
          src={url}
        />

        {activeTemp[0] &&
          activeTemp.map(c => (
            <TempComment
              c={c}
              key={c.id}
              onSubmit={this.handleSubmit}
              commentDelete={this.commentDelete}
            />
          ))}

        {activeComments[0] &&
          activeComments.map(s => (
            <StickyComment
              {...s}
              key={s.id}
              commentDelete={this.commentDelete}
            />
          ))}
      </div>
    );
  }
  componentDidMount() {
    this.element = findDOMNode(this);
    // GET ALL COMMENTS
    const projectComments = this.props.comments;
    console.log(
      'ImageWithComments.js componentDidMount() this.props.comments',
      this.props.comments
    );
    this.setState({
      ...this.state,
      comments: projectComments
    });
  }

  commentDelete = id => {
    let updateTemp = this.state.tempComments.filter(i => i.id !== id);
    let updateComments = this.state.comments.filter(i => i.id !== id);
    this.setState({
      ...this.state,
      tempComments: updateTemp,
      comments: updateComments
    });
  };

  commentEdit = id => {
    let updateComments = this.state.comments.map(i => {
      if (i.id === id) return { ...i, editing: true };
      else return { ...i, editing: false };
    });
    this.setState({
      ...this.state,
      comments: updateComments
    });
  };

  makeComment = (id, x, y) => {
    const newComment = {
      id: uuidv1(),
      imageId: id,
      userId: this.props.activeUser.id,
      username: this.props.activeUser.username,
      projectId: this.props.thisProject.id,
      editing: false,
      left: `${x}px`,
      top: `${y}px`,
      text: ''
    };
    this.setState({
      ...this.state,
      tempComments: [...this.state.tempComments, newComment]
    });
  };

  handleClick = async (e, id) => {
    e.persist();
    let x = e.nativeEvent.clientX;
    let y = e.nativeEvent.clientY;
    await this.updateElementPosition(x, y);
    x = this.leftOffset;
    y = this.topOffset;
    this.makeComment(id, x, y);
  };

  handleSubmit = async (e, c) => {
    e.preventDefault();
    const { comments, tempComments } = this.state;
    let updateTemp = tempComments.filter(i => i.id !== c.id);
    const thisComment = { ...c };

    // delete local state flags before submitting to database
    delete thisComment.id;
    delete thisComment.editing;
    console.log('ImageWithComments.js handleSubmit() thisComment', thisComment);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/comments/photo`,
        thisComment
      );
      const newComment = res.data.data[0];
      //glue the avatar back on and insert into local state so we don't have to reload the component
      newComment.userAvatar = this.props.activeUser.avatar;

      this.setState({
        ...this.state,
        tempComments: updateTemp,
        comments: [...comments, newComment]
      });
    } catch (err) {
      console.log('ImageWithComments.js handleSubmit() ERROR', err);
    }
  };

  updateElementPosition = (x, y) => {
    const rect = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
    this.topOffset = rect.top > 0 ? y : y - rect.top;
    this.leftOffset = rect.left > 0 ? x : x - rect.left;
  };
}
