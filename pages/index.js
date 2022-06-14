import { useState, useEffect } from "react"
import { MdNotifications, MdNotificationsOff } from "react-icons/md"
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material"
import { useRouter } from "next/router"

import {
  createNotification,
  getNotifications,
  updateNotification,
} from "../gql/queries"
import { client } from "../gql"
import NewNotification from "../components/new-notification"

const Home = () => {
  const [shouldDisconnect, setShouldDisconnect] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [important, setImportant] = useState(false)
  const [newNotifications, setNewNotifications] = useState([])
  const [shouldDisplayNotification, setShouldDisplayNotification] =
    useState(false)

  const fetchNotifications = async () => {
    try {
      const fetch = await client.query({
        query: getNotifications,
      })
      if (fetch.data.notifications) {
        const notifications = fetch.data.notifications.data
        setNotifications(notifications)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/authenticate")
    } else {
      setLoading(false)
      fetchNotifications()
    }
  }, [])

  useEffect(() => {
    if (shouldDisconnect) {
      router.replace("/authenticate")
      setShouldDisconnect(false)
    }
  }, [shouldDisconnect])

  const submitNotification = async (data) => {
    try {
      const message = await client.mutate({
        mutation: createNotification,
        variables: {
          data,
        },
      })
      if (message.data.createNotification) {
        const newNotification = message.data.createNotification.data
        console.log(newNotification)
        setNotifications([...notifications, newNotification])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setViewed = async (id) => {
    try {
      const update = await client.mutate({
        mutation: updateNotification,
        variables: {
          id,
          data: {
            viewed: true,
          },
        },
      })
      if (update.data.updateNotification) {
        const updatedNotifications = notifications.map((el) =>
          el.id === id
            ? { id: el.id, attributes: { ...el.attributes, viewed: true } }
            : el
        )
        console.log(updatedNotifications)
        setNotifications(updatedNotifications)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return !loading ? (
    <div
      onClick={() => setShouldDisplayNotification(false)}
      className="flex flex-col h-full"
    >
      <div className="p-[6px] flex items-center justify-end">
        <div className="flex items-center relative h-[37px]">
          <div
            onClick={(e) => {
              e.stopPropagation()
              setShouldDisplayNotification(true)
            }}
            className="h-full flex items-center relative cursor-pointer hover:bg-slate-100 rounded-full"
          >
            {notifications.filter((n) => !n.attributes.viewed).length ? (
              <div className="relative flex items-center p-1">
                <MdNotifications
                  style={{ fontSize: 26, color: "black" }}
                  className="mr-2"
                />
                <div className="font-bold text-red-500 rounded-full w-[9px] h-[9px] text-[7px] absolute top-1 right-2 flex items-center justify-center">
                  +{notifications.filter((n) => !n.attributes.viewed).length}
                </div>
              </div>
            ) : (
              <MdNotificationsOff style={{ fontSize: 26 }} className="mr-2" />
            )}
          </div>
          {shouldDisplayNotification && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-[0px] w-[200px] border-solid border-[0.5px] border-black top-[36px] z-10 bg-white"
            >
              {[...notifications].reverse().map((n) => (
                <NewNotification
                  key={n.id}
                  {...n.attributes}
                  id={n.id}
                  setViewed={setViewed}
                />
              ))}
            </div>
          )}
          <Button
            onClick={() => {
              localStorage.removeItem("token")
              setShouldDisconnect(true)
            }}
          >
            Disconnect
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = {
              title,
              body,
              important,
            }
            submitNotification(data)
            setShouldDisplayNotification(true)
          }}
          className="p-4 border-b border-solid border-black"
        >
          <h4>Create a notification</h4>
          <div className="flex h-[30px] items-center">
            <TextField
              className="mr-6 h-full"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                "& label[data-shrink=true]": {
                  top: 0,
                },
                "& label[data-shrink=false]": {
                  top: -13,
                },

                "& div": {
                  height: 30,
                },
                "& fieldset": {
                  height: 30,
                },
                "& input": {
                  height: 30,
                },
              }}
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              className="mr-6 h-full"
              label="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              sx={{
                "& label[data-shrink=true]": {
                  top: 0,
                },
                "& label[data-shrink=false]": {
                  top: -13,
                },
                "& div": {
                  height: 30,
                },
                "& fieldset": {
                  height: 30,
                },
                "& input": {
                  height: 30,
                  width: 600,
                },
              }}
              variant="outlined"
              autoComplete="off"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Important"
              labelPlacement="start"
              className="mr-6 h-[30px]"
              checked={important}
              onChange={() => setImportant(!important)}
            />

            <Button
              type="submit"
              className="bg-blue-500 text-white hover:text-blue-500 hover:border-[0.5px] border-solid border-slate-300 h-[30px]"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null
}

export default Home
