'use client'

import { handleDeleteUserAction } from '@/utils/actions'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Popconfirm, Table } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import UserCreate from './user.create'
import UserUpdate from './user.update'

interface IProps {
  users: any
  meta: {
    current: number
    pageSize: number
    pages: number
    total: number
  }
}

const UserTable = (props: IProps) => {
  const { users, meta } = props
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [dataUpdate, setDataUpdate] = useState<any>(null)

  const columns = [
    {
      title: 'STT',
      render: (_: any, record: any, index: any) => {
        return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>
      },
    },
    {
      title: '_id',
      dataIndex: '_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (text: any, record: any, index: any) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: 'pointer', marginRight: 10 }}
              onClick={() => {
                setDataUpdate(record)
                setIsUpdateModalOpen(true)
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={'Confirm delete user'}
              description={'Are you sure to delete this user?'}
              onConfirm={async () => await handleDelete(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <span style={{ cursor: 'pointer' }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    const { current, pageSize } = pagination
    const params = new URLSearchParams(searchParams)

    if (current) params.set('current', current.toString())
    if (pageSize) params.set('pageSize', pageSize.toString())

    replace(`${pathname}?${params.toString()}`)
  }

  const handleDelete = async (id: string) => {
    const res = await handleDeleteUserAction(id)

    if (res?.data) {
      const totalAfterDelete = meta.total - 1
      const newTotalPages = Math.ceil(totalAfterDelete / meta.pageSize)
      const newCurrent =
        meta.current > newTotalPages ? newTotalPages : meta.current

      const params = new URLSearchParams(searchParams)
      params.set('current', newCurrent.toString())
      replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <span>Manager Users</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create User</Button>
      </div>
      <Table
        bordered
        dataSource={users}
        columns={columns}
        rowKey={'_id'}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} of {total} items
              </div>
            )
          },
        }}
        onChange={onChange}
      />

      <UserCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UserUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  )
}
export default UserTable
