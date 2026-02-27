import React, { useState } from "react";
import TopHeader from "../Layout/TopHeader";
import Footer from "../Layout/Footer";
import axios from "axios";
import { Base_Url } from "../Api/Base_Url";
import { toast } from "react-toastify";
import SectionTitle from "../Layout/SectionTitle";


const Googleform = () => {
    const [data, setData] = useState([]);
    const exportCSV = () => {
        const headers = [
            "Name",
            "Organization",
            "Domain",
            "Number of User",
            "Email",
            "Phone",
        ];

        const rows = data.map(item => [
            item.name,
            item.organization_name,
            item.domain,
            item.no_of_user,
            item.email,
            item.phone,
        ]);

        let csvContent =
            headers.join(",") +
            "\n" +
            rows.map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "customers.csv";
        link.click();
    };

    const fetchGws = async () => {
        try {
            const resp = await axios.get(`${Base_Url}/enquiry`)
            if (resp.data.success) {
                console.log(resp.data)
                setData(resp.data.data);

            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch User")
        }
    }

    React.useEffect(() => {
        fetchGws()
    }, [])

    return (
        <>
            <TopHeader />

            <section className="py-4 px-4">
                <div className="container mx-auto">
                    <div className="flex justify-between">
      <SectionTitle title="Register Customer" />
                    <button
                        onClick={exportCSV}
                        className="bg-blue-400 text-xs uppercase text-white px-5 rounded py-1"
                    >
                        Export CSV
                    </button>
                        </div>
              

                    <div className="pt-6 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">

                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Organization Name</th>
                                    <th className="p-3 text-left">Domain</th>
                                    <th className="p-3 text-left">Number of User</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone</th>

                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-6 text-gray-500">
                                            No data found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr
                                            key={itm._id}
                                            className="bg-white shadow-sm rounded"
                                        >
                                            {/* NAME */}
                                            <td className="p-3">{itm.name}</td>
                                            {/* PHONE */}
                                            <td className="p-3">{itm.organization_name}</td>
                                            <td className="p-3">{itm.domain}</td>
                                            <td className="p-3">{itm.no_of_user}</td>
                                            <td className="p-3">{itm.email}</td>
                                            <td className="p-3">{itm.phone}</td>

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
    );
};

export default Googleform;
