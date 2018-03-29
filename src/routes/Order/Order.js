import { connect } from "dva";
import React from "react";
import {
  Table,
  Pagination,
  Popconfirm,
  Icon,
  Input,
  Button,
  Tooltip
} from "antd";
import { routerRedux } from "dva/router";
import styles from "./Order.less";
import { PAGE_SIZE } from "../../services/constants";
import OrderModal from "./OrderModal";
import Filter from "../Win/Filter";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

class Order extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  componentDidMount() {
    this.pageChangeHandler(1);
  }
  deleteHandler(id) {
    const { dispatch } = this.props;
    dispatch({
      type: "order/remove",
      payload: id
    });
  }
  pageChangeHandler(page) {
    const { dispatch } = this.props;
    dispatch({
      type: "order/search",
      payload: { page, values: "" }
    });
  }
  editHandler(id, values) {
    const { dispatch } = this.props;
    //编辑
    dispatch({
      type: "order/patch",
      payload: { id, values }
    });
  }
  render() {
    const columns = [
      {
        title: "学生姓名",
        dataIndex: "userName",
        key: "userName",
        render: text => <a href="">{text}</a>
      },
      {
        title: "课程编号",
        dataIndex: "courseId",
        key: "courseId"
      },
      {
        title: "课程名称",
        dataIndex: "courseName",
        key: "courseName"
      },
      {
        title: "折扣信息",
        dataIndex: "discount",
        key: "discount"
      },
      {
        title: "成交总金额",
        dataIndex: "transactionFee",
        key: "transactionFee"
      },
      {
        title: '订单状态',
        dataIndex: "orderStatus", //1-待支付，2-已支付，3-支付失败,
        key: "orderStatus",
        render: text => <div>{text==1?'待支付':(text==2?'已支付':'支付失败')}</div>
      },
      {
        title: "创建时间",
        dataIndex: "creatDate",
        key: "creatDate"
      },
      {
        title: "Operation",
        key: "operation",
        render: (text, record) => (
          <span className={styles.operation}>
            <OrderModal
              record={record}
              columns={columns}
              onOk={this.editHandler.bind(null, record.id)}
            >
              <a>Edit</a>
            </OrderModal>
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={this.deleteHandler.bind(null, record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    const filterProps = {
      columns,
      TheModal: OrderModal,
      createHandler(values) {
        dispatch({
          type: "order/create",
          payload: values
        });
      },
      onFilterChange(values) {
        const page = 1;
        dispatch({
          type: "order/search",
          payload: { page, values }
        });
      }
    };
    const {
      dispatch,
      list: dataSource,
      loading,
      total,
      page: current
    } = this.props;
    return (
      <PageHeaderLayout title="会员管理">
        <div className={styles.normal}>
          <div>
            <div className={styles.create}>
              <Filter {...filterProps} />
            </div>
            <Table
              loading={loading}
              bordered={true}
              columns={columns}
              dataSource={dataSource}
              rowKey={record => record.id}
              pagination={false}
              scroll={{ x: 900 }}
            />
            <Pagination
              className="ant-table-pagination"
              total={total}
              current={current}
              pageSize={PAGE_SIZE}
              onChange={this.pageChangeHandler}
            />
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.order;
  return {
    list,
    total,
    page,
    loading: state.loading.models.order
  };
}

export default connect(mapStateToProps)(Order);
