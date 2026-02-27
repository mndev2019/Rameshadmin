import React, { useState } from 'react'
import TopHeader from '../Layout/TopHeader'
import Footer from '../Layout/Footer'
import FormLabel from '../Layout/FormLabel'
import SectionTitle from '../Layout/SectionTitle'
import axios from 'axios'
import { Base_Url } from '../Api/Base_Url'
import { toast } from 'react-toastify'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'

const Faq = () => {
    const [data, setdata] = useState();
    const [question, setquestion] = useState();
    const [answer, setanswer] = useState();
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = { question, answer };

        try {
            let response;

            if (editId) {
                // 🔁 UPDATE
                response = await axios.put(`${Base_Url}/faq/${editId}`, requestData);
            } else {
                // ➕ CREATE
                response = await axios.post(`${Base_Url}/faq`, requestData);
            }

            if (response.data.success === true) {
                toast.success(response.data.message);
                setquestion("");
                setanswer("");
                setEditId(null);
                fetchfaq(); // refresh list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Server error");
        }
    };

    const handleEdit = (faq) => {
        setquestion(faq.question);
        setanswer(faq.answer);
        setEditId(faq._id);
    };

    const handleDelete = async (id) => {
        try {
            const resp = await axios.delete(`${Base_Url}/faq/${id}`);

            if (resp.data.success) {
                toast.success(resp.data.message);
                fetchfaq();
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Delete failed");
        }
    };
    const fetchfaq = async () => {
        try {
            const resp = await axios.get(`${Base_Url}/faq`)
            if (resp.data.success) {
                console.log(resp.data)
                setdata(resp.data.data);

            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch User")
        }
    }

    React.useEffect(() => {
        fetchfaq()
    }, [])
    return (
        <>
            <TopHeader />
            <section className="py-4 px-4">
                <div className="container mx-auto">
                    <SectionTitle title="FAQ" />
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-4 items-baseline-last">

                            <div>
                                <FormLabel label="Question" />
                                <input
                                    value={question}
                                    onChange={(e) => setquestion(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <FormLabel label="Answer" />
                                <input
                                    value={answer}
                                    onChange={(e) => setanswer(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div className=" gap-2">
                                <button className="bg-blue-400 text-xs uppercase text-white px-5 rounded py-3">
                                   {editId?"UPDATE":"SUBMIT"}
                                </button>


                            </div>

                        </div>
                    </form>
                    <div className="pt-5 overflow-x-auto">
                        <table className="w-full table-fixed border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold text-gray-700 text-start">
                                    <th className="p-3 w-[15%] text-left">Question</th>
                                    <th className="p-3 w-[10%] text-center">Answer</th>

                                    <th className="p-3 w-[10%] text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No faq found
                                        </td>
                                    </tr>
                                ) : (
                                    data?.map(faq => (
                                        <tr
                                            key={faq._id}
                                            className="bg-white text-sm  shadow-sm rounded"
                                        >
                                            {/* Title */}
                                            <td className="p-3 font-medium break-words">
                                                {faq.question}
                                            </td>
                                            <td className="p-3 font-medium break-words">
                                                {faq.answer}
                                            </td>


                                            {/* Action */}
                                            <td className="p-3">
                                                <div className="flex gap-3 justify-center">
                                                    <button
                                                        onClick={() => handleEdit(faq)}
                                                    >
                                                        <FaRegEdit className="text-blue-500 text-xl hover:scale-110 transition" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(faq._id)}
                                                    >
                                                        <AiOutlineDelete className="text-red-500 text-xl hover:scale-110 transition" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Faq
