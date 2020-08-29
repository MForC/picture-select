import React from "react";
import "./pictureSelect.css";

export default class PictureSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeAll = this.changeAll.bind(this);
    this.changeOne = this.changeOne.bind(this);
  }
  componentDidMount() {
    const { value } = this.props;
    if (value && value.length) {
      value.forEach((item) => {
        this.setState({
          [`chechkbox_${item}`]: true,
        });
      });
    }
  }
  changeAll(value) {
    const { pictures } = this.props;
    if (!value) {
      pictures.forEach((item) => {
        this.setState({
          [`chechkbox_${item.id}`]: true,
        });
      });
      this.props.onChange(pictures.map((item) => item.id));
    } else {
      pictures.forEach((item) => {
        this.setState({
          [`chechkbox_${item.id}`]: false,
        });
      });
      this.props.onChange([]);
    }
  }
  changeOne(id) {
    const jdg = this.state[`chechkbox_${id}`] || false;
    this.setState({
      [`chechkbox_${id}`]: !jdg,
    });
    if (!jdg) {
      const { value } = this.props;
      value.push(id);
      this.props.onChange([...value]);
    } else {
      let { value } = this.props;
      value = value.filter((item) => item !== id);
      this.props.onChange(value);
    }
  }
  render() {
    const { pictures, value } = this.props;
    const isSelectAll = value.length === pictures.length;
    let name = "picture-checkbox";
    if ((value || []).length === 0) {
    } else if (isSelectAll) {
      name += " checked";
    } else if (value.length !== 0 && !isSelectAll) {
      name += " notAll";
    }
    return (
      <div className="picture-select">
        <span
          className="picture-select-top"
          onClick={() => this.changeAll(isSelectAll)}
        >
          <span className={name}></span>
          全选
        </span>
        <span className="picture-select-length">
          当前选中{(value || []).length} 个
        </span>
        <div className="picture-box">
          {pictures.map((item) => {
            return (
              <label key={item.id} className="picture-box-item">
                <input
                  type="checkbox"
                  className="picture-box-item-checkbox"
                  checked={this.state[`chechkbox_${item.id}`] || false}
                  onChange={() => this.changeOne(item.id)}
                />
                <img src={item.url} alt="" className="picture-box-item-img" />
                <div className="picture-box-item-text">{item.name}</div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}
