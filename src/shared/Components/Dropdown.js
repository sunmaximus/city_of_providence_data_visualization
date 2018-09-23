import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedItem: this.props.selections[0] || '',
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(item) {
    this.setState({ selectedItem: item });
    this.props.callBack && this.props.callBack(item);
  }

  render() {
    const { selections } = this.props;
    const { dropdownOpen, selectedItem} = this.state;
    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {selectedItem}
        </DropdownToggle>
        <DropdownMenu>
          {selections.map(item => <DropdownItem key={item} onClick={() => this.select(item)}>{item}</DropdownItem>)}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}