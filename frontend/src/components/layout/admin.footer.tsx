'use client'
import { Layout } from 'antd'

const AdminFooter = () => {
  const { Footer } = Layout

  return (
    <Footer style={{ textAlign: 'center' }}>
      LVT ©{new Date().getFullYear()} Created by LVT
    </Footer>
  )
}

export default AdminFooter
