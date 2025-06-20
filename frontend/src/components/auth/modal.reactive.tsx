'use client'

import { useHasMounted } from '@/utils/customHook'
import { Button, Form, Input, Modal, notification, Steps } from 'antd'
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { sendRequest } from '@/utils/api'

const ModalReactive = (props: any) => {
  const { isModalOpen, setIsModalOpen, userEmail } = props
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [userId, setUserId] = useState('')

  const hasMounted = useHasMounted()

  useEffect(() => {
    if (userEmail) {
      form.setFieldValue('email', userEmail)
    }
  }, [userEmail])

  if (!hasMounted) return <></>

  const onFinishStep0 = async (values: any) => {
    const { email } = values
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
      method: 'POST',
      body: {
        email,
      },
    })

    if (res?.data) {
      setUserId(res?.data?._id)
      setCurrent(1)
    } else {
      notification.error({
        message: 'Resend error',
        description: res?.message,
      })
    }
  }

  const onFinishStep1 = async (values: any) => {
    const { code } = values
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      method: 'POST',
      body: {
        code,
        _id: userId,
      },
    })

    if (res?.data) {
      setCurrent(2)
    } else {
      notification.error({
        message: 'Active error',
        description: res?.message,
      })
    }
  }

  return (
    <Modal
      title="Activate account"
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      maskClosable={false}
      footer={null}
    >
      <Steps
        current={current}
        items={[
          {
            title: 'Login',
            icon: <UserOutlined />,
          },
          {
            title: 'Verification',
            icon: <SolutionOutlined />,
          },
          {
            title: 'Done',
            icon: <SmileOutlined />,
          },
        ]}
      />
      {current === 0 && (
        <>
          <div style={{ margin: '20px 0' }}>
            <p>Your account is not activated</p>
          </div>
          <Form
            name="verify"
            onFinish={onFinishStep0}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item label="" name="email">
              <Input disabled value={userEmail} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Resend
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      {current === 1 && (
        <>
          <div style={{ margin: '20px 0' }}>
            <p>Please enter verification code</p>
          </div>
          <Form
            name="verify2"
            onFinish={onFinishStep1}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Please input your code!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Active
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      {current === 2 && (
        <div style={{ margin: '20px 0' }}>
          <p>
            Your account has been activated successfully. Please log in again.
          </p>
        </div>
      )}
    </Modal>
  )
}

export default ModalReactive
