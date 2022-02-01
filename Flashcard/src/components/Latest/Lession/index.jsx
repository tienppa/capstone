import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Empty, message, Modal, Row, Tag, Menu } from "antd";
import checkAcceptAPI from "apis/check.accessibility";
import lessionAPI from "apis/lession.api";
import privateLessionAPI from "apis/private.lession.api";
import subjectAPI from "apis/subject.api";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updatePointUser } from "redux/actions/user";
import { Link } from "react-router-dom";

const { confirm } = Modal;

function Lession() {
  const history = useHistory();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const subjectId = query.get("subjectId");
  const [lession, setLession] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const increaseView = async () => {
      const response = await subjectAPI.increaseView({ subjectId: subjectId });
    };
    increaseView();
  }, []);

  useEffect(() => {
    const getLession = async () => {
      const response = await lessionAPI.getLessionBySubId({ subjectId });
      if (response.status === "Success") {
        setLession(response.lession);
      } else {
        console.log(response.message);
      }
    };
    getLession();
  }, [subjectId]);

  const requestLession = async (id) => {
    const response = await privateLessionAPI.requestLession({ lessionId: id });
    if (response.status === "Success") {
      message.success(response.message);
    }
  };

  const checkApproveLession = async (id) => {
    const response = await checkAcceptAPI.checkAcceptLession({ lessionId: id });
    let status = response.status;
    switch (status) {
      case "Success": {
        callLinkPublic(id);
        if (response.user_point) {
          message.success(`Current point: ${response.user_point}`);
          dispatch(updatePointUser(response.user_point));
        }
        break;
      }
      case "Failed": {
        message.error(response.message);
        break;
      }
      case "Point Unavailable": {
        message.error(response.message);
        break;
      }
      case "Not Found Request": {
        confirm({
          title: "Confirm send request?",
          icon: <ExclamationCircleOutlined />,
          content: "You should send request to see this subject.",
          onOk() {
            requestLession(id);
          },
          onCancel() {
            console.log("Cancel");
          },
        });
        break;
      }
      default:
        message.error(response.message);
        break;
    }
  };

  const callLinkPublic = (id) => {
    history.push(`/latest/flashcard?lessionId=${id}`);
  };

  return (
    <div style={{ padding: "0 18px" }}>
      <Menu
        mode="horizontal"
        style={{ backgroundColor: "#F6F7FB", marginBottom: "10px" }}
      >
        <Menu.Item key="mail">
          <Link to={`/quiz/related-quiz?subjectId=${subjectId}`}>
            Take quiz
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to={"/quiz/history"}>Quiz completion</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={[16, 16]}>
        {lession ? (
          lession.map((item) => {
            return (
              <Col xs={24} xl={12} xxl={8} key={item.lessionId}>
                <Card
                  size="small"
                  title={item.lessionName}
                  className="card-content--height card-content--hover"
                  key={item.lessionId}
                  extra={item.statusId === 2 && <Tag color="#f50">Private</Tag>}
                  onClick={
                    item.statusId !== 2
                      ? () => {
                          callLinkPublic(item.lessionId);
                        }
                      : () => {
                          checkApproveLession(item.lessionId);
                        }
                  }
                >
                  <div className="card-content__wrap">
                    <div className="card-content__main">
                      <span className="card-content__text">
                        {item.lessionDescription}
                      </span>
                    </div>
                    <div className="card-content__author">
                      <span className="card-content__author-name">
                        <Avatar
                          style={{ backgroundColor: "#1890FF" }}
                          size="small"
                          icon={<UserOutlined />}
                        />{" "}
                        {item.author}
                      </span>
                      <span className="card-content__date">
                        {Moment(item.createdDate).format("YYYY-MM-DD")}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })
        ) : (
          <div className="empty-container">
            <Empty />
          </div>
        )}
      </Row>
    </div>
  );
}
export default Lession;
