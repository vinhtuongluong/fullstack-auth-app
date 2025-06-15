'use client'

import { CrownOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter()

  return (
    <div style={{ padding: 20 }}>
      <Result
        icon={<CrownOutlined />}
        title="Fullstack Auth App - createdBy @LVT"
        extra={
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Button type="primary" onClick={() => router.push('/auth/login')}>
              Login
            </Button>
            <Button onClick={() => router.push('/auth/register')}>
              Register
            </Button>
          </div>
        }
      />
    </div>
  )
}

export default HomePage
