import React from "react";
import "./style.scss";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer_item">
          <div className="footer_title">MYSHOES.VN-GIÀY CHÍNH HÃNG</div>
          <div style={{ display: "flex" }}>
            <img
              style={{ height: 90, paddingRight: 5 }}
              src="https://myshoes.vn/image/cache/catalog/logo/logo-myshoes-ok-90x90.png"
              alt="img"
            />
            <p className="footer_content">
              Myshoes.vn được định hướng trở thành hệ thống thương mại điện tử
              bán giày chính hãng hàng đầu Việt Nam. Showroom: 249 Xã Đàn, Đống
              Đa, Hà Nội Hotline: 0973711868
            </p>
          </div>
        </div>

        <div className="footer_item">
          <div className="footer_title">VỀ CHÚNG TÔI</div>
          <div>
            <ul className="footer_menu">
              <li className="menu_item">
                <a href="." className="footer_content">
                  Giới thiệu
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Điều khoản sử dụng
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Chính sách bảo mật
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Tin tức Myshoes
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_item">
          <div className="footer_title">Khách Hàng</div>
          <div>
            <ul className="footer_menu">
              <li className="menu_item">
                <a href="." className="footer_content">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Chính sách đổi trả
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Chính sách bảo hành
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Khách hàng thân thiết
                </a>
              </li>
              <li className="menu_item">
                <a href="." className="footer_content">
                  Hướng dẫn chọn size
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_item">
          <div>
            <p className="footer_title">Chứng nhận</p>
          </div>
          <div className="footer_logo">
            <div>
              <img
                style={{ height: 55, marginBottom: 10 }}
                src="https://images.dmca.com/Badges/DMCA_logo-grn-btn150w.png?ID=1ed4cd9e-5ee4-4b63-95dc-c70388edd3cb"
                alt="img"
              />
            </div>
            <div>
              <img
                style={{ height: 55 }}
                src="https://myshoes.vn/image/catalog/logo/logo-bct.png"
                alt="img "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
