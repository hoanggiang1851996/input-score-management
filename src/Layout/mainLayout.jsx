import {Breadcrumb, Layout, Menu, theme} from "antd";
import {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(<div onClick={() => navigate("course-management")}>Quản lý khóa học</div>, '1', <PieChartOutlined />),
    getItem(<div onClick={() => navigate("class-management")}>Quản lý lớp</div>, '2', <DesktopOutlined />),
    getItem(<div onClick={() => navigate("student-management")}>Quản lý học viên</div>, '3', <UserOutlined />),
    getItem(<div onClick={() => navigate("course-unit-management")}>Quản lý học phần</div>, '4', <TeamOutlined />),
    getItem(<div onClick={() => navigate("import-score")}>Nhập điểm</div>, '9', <FileOutlined />),
  ];
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}