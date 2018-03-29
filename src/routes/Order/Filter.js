import { Component } from "react";
import OrderModal from "./OrderModal";
import { Form, Input, Row, Col, Button } from "antd";
const { Search } = Input;
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 15
  }
};
const TwoColProps = {
  ...ColProps,
  xl: 96
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '',
    };
  }

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };
  handleSubmit = () => {
    const {getFieldsValue} = this.props.form;
    const { onFilterChange } = this.props;
    // onFilterChange(fields)
    //   dispatch({
    //     type: "users/search",
    //     payload: values
	//   });
	let fields = getFieldsValue();
	onFilterChange(fields.name)
  };
  returnForm() {
    return this.props.form;
  }
  render() {
    const name=this.state.name;
    const { createHandler,columns,TheModal} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }}>
          {getFieldDecorator("name", { initialValue: name })(
            <Search placeholder="搜索" onSearch={this.handleSubmit} />
          )}
        </Col>
        <Col
          {...TwoColProps} xl={{ span: 16 }} md={{ span: 12 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                Search
              </Button>
              {/* <Button onClick={handleReset}>Reset</Button> */}
            </div>
            <div>
              <TheModal
              columns={columns}
              record={{}}
              isCreate={true}
              onOk={createHandler}>
                <Button type="ghost">添加数据</Button>
              </TheModal>
              {/* <Button type="ghost" onClick={onAdd}>Create</Button> */}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Filter);
