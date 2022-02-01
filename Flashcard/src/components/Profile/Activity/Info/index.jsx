import { useLocation } from "react-router-dom";
import "./index.css";
import { Skeleton, Card } from "antd";
import { Base64 } from "js-base64";
import authAPI from "apis/auth.api";
import { useEffect, useState } from "react";
import images from "constants/images";
import { BorderlessTableOutlined } from "@ant-design/icons";

const { Meta } = Card;

function Info() {
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const email = Base64.decode(query.get("uid"));
  const [info, setInfo] = useState([]);
  const [interest, setInterest] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(email);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");

  useEffect(() => {
    const getInfo = async () => {
      const response = await authAPI.getUserInfo({
        email: "luanvnse63360@gmail.com",
      });
      console.log(response);
      if (response.status === "Success") {
        setInfo(response.basicInfor);
        setInterest(response.subjectInterest);
        setLoading(false);
      } else {
        console.log(response.message);
      }
    };
    getInfo();
  }, [email]);

  return (
    <Skeleton loading={loading} active>
      <div className="info__container">
        <div className="info__wrap">
          <div className="info__header">
            <div className="info__header--left">
              <div className="info__header--left-wrap">
                <div className="info__header--left-name">{info?.fullName}</div>
                <div className="info__header--left-info">
                  <Meta title="Email" description={info?.email} />
                  <br />
                  <Meta title="Gender" description={info?.gender} />
                </div>
              </div>
            </div>
            <div className="info__header--right">
              <img src={images.HOME1_PIC} alt="photo" />
            </div>
          </div>
          <span className="info__header--date">08/02/2000</span>
        </div>
        <div className="info__content">
          <div className="info__content--left">
            <div className="info__content--left-title">
              <BorderlessTableOutlined className="info-icon" /> INTERREST TOPIC
            </div>
          </div>
          <div className="info__content--right">
            {interest &&
              interest.map((item) => {
                return (
                  <div className="info__content--right-card">
                    <span>
                      <BorderlessTableOutlined />
                      {item?.subjectName}
                    </span>
                    <div className="info__content--right-card__footer">
                      <span className="footer-item">
                        {item.subjectDescription}
                      </span>
                      <span className="footer-item">{item?.accountId}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
export default Info;
