import {Layout, Menu, theme} from "antd";
import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, UnorderedListOutlined} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;


export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    switch (pathName) {
      case "/category-management":
        setSelectedKeys(["1"]);
        break;
      case "/course-management":
        setSelectedKeys(["2"]);
        break;
      case "/subject-management":
        setSelectedKeys(["3"]);
        break;
      case "/student-management":
        setSelectedKeys(["4"]);
        break;
      case "/teacher-management":
        setSelectedKeys(["5"]);
        break;
      case "/course-unit-management":
        setSelectedKeys(["6"]);
        break;
      case "/import-score":
        setSelectedKeys(["7"]);
        break;
      default:
        break;
    }
  }, []);

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
    getItem(<div onClick={() => navigate("category-management")}>Quản lý danh mục</div>, '1', <UnorderedListOutlined />),
    getItem(<div onClick={() => navigate("course-management")}>Quản lý khóa học</div>, '2', <PieChartOutlined />),
    getItem(<div onClick={() => navigate("subject-management")}>Quản lý môn học</div>, '3', <DesktopOutlined />),
    getItem(<div onClick={() => navigate("student-management")}>Quản lý học viên</div>, '4', <UserOutlined />),
    getItem(<div onClick={() => navigate("teacher-management")}>Quản lý giáo viên</div>, '5', <UserOutlined />),
    getItem(<div onClick={() => navigate("course-unit-management")}>Quản lý lớp học phần</div>, '6', <TeamOutlined />),
    getItem(<div onClick={() => navigate("import-score")}>Nhập điểm</div>, '7', <FileOutlined />),
  ];
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onSelect={(e) => setSelectedKeys(e.selectedKeys)} selectedKeys={selectedKeys} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
          {/*<Breadcrumb*/}
          {/*  style={{*/}
          {/*    margin: '16px 0',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Breadcrumb.Item>User</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          <div
            style={{
              padding: 24,
              marginTop: 30,
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
          Phần mềm quản lý điểm {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}