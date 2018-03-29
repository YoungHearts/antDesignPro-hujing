import { connect } from "dva";
import React from "react";
import { Table, Pagination, Popconfirm } from "antd";
import { routerRedux } from "dva/router";
import styles from "./Win.less";
import { PAGE_SIZE } from "../../services/constants";
import WinModal from "./WinModal";
import Filter from "./Filter";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class Win extends React.PureComponent {
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
      type: "win/remove",
      payload: id
    });
  }
  pageChangeHandler(page) {
    const { dispatch } = this.props;
    dispatch({
        type: "win/search",
        payload: { page, values:'' }
    });
  }
  editHandler(id, values) {
    const { dispatch } = this.props;
    //编辑
    dispatch({
      type: "win/patch",
      payload: { id, ...values }
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
        title: "奖品名称",
        dataIndex: "prizeName",
        key: "prizeName"
      },
      {
        title: "是否使用",
        dataIndex: "isConvert",
        key: "isConvert",
        render: text => <div>{text==2?'否':'是'}</div>
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
            <WinModal
              columns={columns}
              record={record}
              onOk={this.editHandler.bind(null, record.id)}
            >
              <a>Edit</a>
            </WinModal>
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
      TheModal:WinModal,
      createHandler(values) {
        dispatch({
          type: "win/create",
          payload: values
        });
      },
      onFilterChange(values) {
        const page = 1;
        dispatch({
          type: "win/search",
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
      <PageHeaderLayout title="中奖明细">
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
            scroll={{ x: 700 }} 
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
  const { list, total, page } = state.win;
  return {
    list,
    total,
    page,
    loading: state.loading.models.win
  };
}

export default connect(mapStateToProps)(Win);
