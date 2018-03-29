import { Component } from "react";
import { Modal, Form, Input, Select } from "antd";
const Option = Select.Option;

const FormItem = Form.Item;

class OrderModal extends Component {
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
    const { userName, prizeName, orderStatus, createDate } = record;
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
              {getFieldDecorator(columns[2].dataIndex, {
                initialValue: record[columns[2].dataIndex]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={columns[3].title}>
              {getFieldDecorator(columns[3].dataIndex, {
                initialValue: record[columns[3].dataIndex]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={columns[4].title}>
              {getFieldDecorator(columns[4].dataIndex, {
                initialValue: record[columns[4].dataIndex]
              })(<Input type="number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={columns[5].title}>
              {getFieldDecorator("orderStatus", {//1-待支付，2-已支付，3-支付失败,
                initialValue: orderStatus==1?'待支付':(orderStatus==2?'已支付':'支付失败'),
                rules: [{ required: false, message: "请选择支付状态" }]
              })(
                <Select
                  placeholder="请选择支付状态"
                  // onChange={this.handleSelectChange}
                >
                  <Option value="1">待支付</Option>
                  <Option value="2">已支付</Option>
                  <Option value="3">支付失败</Option>
                </Select>
              )}
            </FormItem>
            {!isCreate && (
              <FormItem {...formItemLayout} label={columns[6].title}>
                {getFieldDecorator(columns[6].dataIndex, {
                  initialValue: record[columns[6].dataIndex]
                })(<Input disabled />)}
              </FormItem>
            )}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(OrderModal);
