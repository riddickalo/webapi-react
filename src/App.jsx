import logo from './assets/JackTech banner logo.png';
import './App.css';
import MenuItem from './components/MenuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
      <body className=''>
        <Sidebar />
      </body>
    </div>
  );
}

function Sidebar() {
  let homeSideArr = ['機台', '警報', '工單', '基本設定', '系統設定'];

  return (
    <div className='homeSidebar'>
      <ul>
        <li>機台</li>
        <li>警報</li>
        <li>工單</li>
        <li>基本設定</li>
        <li>系統設定</li>
      </ul>
    </div>
  )
}

export default App;
