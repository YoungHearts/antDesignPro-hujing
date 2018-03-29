import { Component } from "react";
import { Modal, Form, Input, Select } from "antd";
const Option = Select.Option;

const FormItem = Form.Item;

class WinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };

  okHandler = () => {
    const { onOk, isCreate } = this.props;
    this.props.form.validateFields((err, values) => {
      let createDate = new Date();
      isCreate && (values = Object.assign(values, { createDate }));
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children, isCreate, columns } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { record } = this.props;
    const { userName, prizeName, isConvert, createDate } = record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="操作"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label={columns[0].title}>
              {getFieldDecorator(columns[0].dataIndex, {
                initialValue: record[columns[0].dataIndex]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={columns[1].title}>
              {getFieldDecorator(columns[1].dataIndex, {
                initialValue: record[columns[1].dataIndex]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={columns[2].title}>
              {getFieldDecorator("isConvert", {
                initialValue: isConvert == 1 ? "是" : "否",
                rules: [{ required: false, message: "请选择是否使用" }]
              })(
                <Select
                  placeholder="请选择"
                  // onChange={this.handleSelectChange}
                >
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
            {!isCreate && (
              <FormItem {...formItemLayout} label={columns[3].title}>
                {getFieldDecorator(columns[3].dataIndex, {
                  initialValue: record[columns[3].dataIndex]
                })(<Input disabled />)}
              </FormItem>
            )}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(WinModal);
