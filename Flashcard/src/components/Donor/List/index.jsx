import {
  DownOutlined,
  PlusOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, Menu, Space, Table, Tag, Tooltip } from "antd";
import donorAPI from "apis/donor.api";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isShowAdd, isShowUpdate } from "redux/actions/donor";
import Add from "../Add";
import Update from "../Update";
import Notification from "components/Notification";
import "./index.css";

function List() {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(null);
  const [types, setTypes] = useState([]);

  const showUpdate = () => {
    dispatch(isShowUpdate(true));
  };

  const showAdd = () => {
    dispatch(isShowAdd(true));
  };

  const findService = (id) => {
    if (!services) return;
    const service = services.find((element) => {
      if (element.id === id) {
        return true;
      }
    });
    setUpdate(service);
  };

  const findType = (id) => {
    if (!types) return;
    const type = types.find((element) => {
      if (element.id === id) {
        return true;
      }
    });
    return type;
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button
          type="primary"
          icon={<CloudUploadOutlined />}
          style={{ width: 120 }}
          onClick={() => {
            showUpdate();
          }}
        >
          Update
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button
          danger
          icon={<DeleteOutlined />}
          type="primary"
          style={{ width: 120 }}
          onClick={() => remove(update?.id)}
        >
          Remove
        </Button>
      </Menu.Item>
    </Menu>
  );

  const getServiceType = async () => {
    const response = await donorAPI.getServiceType();
    if (response.status === "Success") {
      setTypes(response.types);
    } else {
      console.log(response.message);
    }
  };
  const getServices = async () => {
    const response = await donorAPI.getServices();
    if (response.status === "Success") {
      setServices(response.listService);
    } else {
      console.log(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getServices();
    getServiceType();
  }, []);

  const remove = async (id) => {
    const response = await donorAPI.deleteService({ serviceId: id });
    if (response.status === "Success") {
      Notification("success", response.message);
      getServices();
    } else {
      Notification("error", response.message);
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      width: 300,
      fixed: "left",
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      responsive: ["md"],
      render: (type) => (
        <Tooltip placement="topLeft" title={type?.description}>
          {type?.typeName}
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      width: 100,
      responsive: ["md"],
      render: (quantity) => {
        let color = quantity > 10 ? "geekblue" : "red";
        return <Tag color={color}>{quantity}</Tag>;
      },
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      width: 130,
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (text, record) => {
        return (
          <Dropdown overlay={menu} onClick={() => findService(record.key)}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  let data = [];
  services.map((item) => {
    data.push({
      key: item.id,
      service: item.serviceName,
      type: findType(item.serviceTypeId),
      description: item.serviceInformation,
      quantity: item.quantity,
      time: Moment(item.createdDate).format("YYYY-MM-DD"),
    });
  });
  return (
    <div className="ldonor__main--content">
      <Update service={update} types={types} pCallback={getServices} />
      <Add pCallback={getServices} />
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>
          Add service
        </Button>
      </Space>
      <Form>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          footer={() => (
            <>
              Total: <Tag color="#f50">{`${services?.length}`}</Tag>
            </>
          )}
        />
      </Form>
    </div>
  );
}
export default List;
