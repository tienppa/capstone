import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { saveListUser } from "redux/actions/admin";
import { Button, Input, Space, Table, Tag, Radio } from "antd";
import adminAPI from "apis/admin.api";
import ActionMenu from "components/admins/ActionMenu";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
ShowStudent.propTypes = {};

function ShowStudent(props) {
  const listUser = useSelector((state) => state.admin.listUser.accounts);
  // searchText: '',
  // searchedColumn: '',
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [sync, setSync] = useState(false);
  const [syncSpin, setSyncSpin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState("default");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllStudentDonor = async () => {
      const response = await adminAPI.getAllStudentDonor();
      if (response.accounts.length > 0) {
        dispatch(saveListUser(response));
        setSyncSpin(false);
        setIsLoading(false);
      }
    };
    getAllStudentDonor();
  }, [sync]);

  //SEARCH

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //     // Input = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      // if (visible) {
      //     setTimeout(() => Input.select(), 100);
      // }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //END SEARCH
  let columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (item) => <a style={{ color: "blue" }}>{item}</a>,
      // width: '30%',
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (item) => {
        let color = "anti-white";
        if (item === "Student") {
          color = "purple";
        } else if (item === "Donor") {
          color = "geekblue";
        }
        return (
          <>
            <Tag color={color} key={item}>
              {item}
            </Tag>
          </>
        );
      },
      filters: [
        {
          text: "Student",
          value: "Student",
        },
        {
          text: "Donor",
          value: "Donor",
        },
      ],
      onFilter: (value, record) => record.roleName.indexOf(value) === 0,
    },
    {
      title: "Status",
      dataIndex: "statusName",
      key: "statusName",
      render: (item) => {
        let color = "anti-white";
        if (item === "Activate") {
          color = "green";
        } else if (item === "InActivated") {
          color = "orange";
        } else if (item === "Banned") {
          color = "lightblue";
        } else if (item === "Deleted") {
          color = "red";
        }
        return (
          <>
            <Tag color={color} key={item}>
              {item}
            </Tag>
          </>
        );
      },
      filters: [
        {
          text: "Activate",
          value: "Activate",
        },
        {
          text: "InActivated",
          value: "InActivated",
        },
        {
          text: "Banned",
          value: "Banned",
        },
        {
          text: "Deleted",
          value: "Deleted",
        },
      ],
      onFilter: (value, record) => record.statusName.indexOf(value) === 0,
    },
    // {
    //     title: 'Year Of Birth',
    //     dataIndex: 'DOB',
    //     key: 'DOB',
    //     render: item => (
    //         <>
    //             {item.slice(0, 10)}
    //         </>
    //     )
    // },
    // {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address'
    // },
    {
      title: "Date of Register",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (item) => <>{item.slice(0, 10)}</>,
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        parseInt(a.createdDate.replaceAll("-", "")) -
        parseInt(b.createdDate.replaceAll("-", "")),
    },
    {},
  ];

  const updatedColumns = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (item, index) => {
        return <ActionMenu item={item} />;
      },
    },
  ];
  const handleSyncClick = () => {
    setSyncSpin(true);
    setSync(!sync);
    setIsLoading(true);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <>
      <div
        style={{
          // position: 'relative',
          // display: 'block',
          // left: '90%',
          // bottom: '10px',

          color: "blue",
          cursor: "pointer",
        }}
        onClick={handleSyncClick}
      >
        <div style={{ display: "inline-block" }}>
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ display: "inline-block", float: "right" }}>
          Sync{" "}
          <SyncOutlined
            spin={syncSpin}
            style={{
              fontSize: "17px",
            }}
          />
        </div>
      </div>
      {listUser && (
        <Table
          showHeader={true}
          loading={isLoading}
          columns={updatedColumns}
          dataSource={listUser}
          size={size}
        />
      )}
    </>
  );
}

export default ShowStudent;
