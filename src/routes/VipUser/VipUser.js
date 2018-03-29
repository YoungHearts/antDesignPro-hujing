import { connect } from "dva";
import React from "react";
import { Table, Pagination, Popconfirm } from "antd";
import { routerRedux } from "dva/router";
import styles from "./VipUser.less";
import { PAGE_SIZE } from "../../services/constants";
import VipModal from "./VipModal";
import Filter from "../Win/Filter";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class VipUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
      type: "vipuser/remove",
      payload: id
    });
  }
  pageChangeHandler(page) {
    const { dispatch } = this.props;
    dispatch({
        type: "vipuser/search",
        payload: { page, values:'' }
    });
  }
  editHandler(id, values) {
    const { dispatch } = this.props;
    //编辑
    dispatch({
      type: "vipuser/patch",
      payload: { id, values }
    });
  }
  render() {
    const columns = [
      {
        title: "会员姓名",
        dataIndex: "userName",
        key: "userName",
        render: text => <a href="">{text}</a>
      },
      {
        title: "电话",
        dataIndex: "mobilePhone",
        key: "mobilePhone"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "抽奖次数",
        dataIndex: "prizeTimes",
        key: "prizeTimes"
      },
      {
        title: "会员状态",
        dataIndex: "isVip",
        key: "isVip",
        render: text => <div>{text==1?'是':'否'}</div>
      },
      {
        title: "中奖时间",
        dataIndex: "createDate",
        key: "createDate"
      },
      {
        title: "Operation",
        key: "operation",
        render: (text, record) => (
          <span className={styles.operation}>
            <VipModal
              record={record}
              columns={columns}
              onOk={this.editHandler.bind(null, record.id)}
            >
              <a>Edit</a>
            </VipModal>
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
      TheModal:VipModal,
      createHandler(values) {
        dispatch({
          type: "vipuser/create",
          payload: values
        });
      },
      onFilterChange(values) {
        const page = 1;
        dispatch({
          type: "vipuser/search",
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
  const { list, total, page } = state.vipuser;
  return {
    list,
    total,
    page,
    loading: state.loading.models.vipuser
  };
}

export default connect(mapStateToProps)(VipUser);
