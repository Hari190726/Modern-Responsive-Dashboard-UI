import React, { useState } from "react";
import {
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  avatar: string;
  status: "active" | "inactive";
  lastContact: string;
}

interface ContactsProps {
  searchQuery: string;
}

const Contacts: React.FC<ContactsProps> = ({ searchQuery }) => {
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Harini",
      email: "harini@example.com",
      phone: "+91 98765 43210",
      company: "Chennai Tech Solutions",
      location: "Chennai, Tamil Nadu",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active",
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Suresh Kumar",
      email: "suresh@example.com",
      phone: "+91 91234 56789",
      company: "Coimbatore Design Studio",
      location: "Coimbatore, Tamil Nadu",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active",
      lastContact: "1 week ago",
    },
    {
      id: 3,
      name: "Priya Ramesh",
      email: "priya@example.com",
      phone: "+91 90123 45678",
      company: "Madurai Marketing Pro",
      location: "Madurai, Tamil Nadu",
      avatar:
        "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "inactive",
      lastContact: "2 weeks ago",
    },
    {
      id: 4,
      name: "Anand Raj",
      email: "anand@example.com",
      phone: "+91 90987 65432",
      company: "Trichy Consulting Group",
      location: "Tiruchirappalli, Tamil Nadu",
      avatar:
        "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",

      status: "active",
      lastContact: "3 days ago",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchQuery === "" ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || contact.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleContactAction = (action: string, contactId: number) => {
    console.log(`${action} contact:`, contactId);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Contacts
        </h1>
        <p className="text-gray-400">
          Manage your business contacts and relationships
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "all" | "active" | "inactive")
              }
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Contacts</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              List
            </button>
          </div>
        </div>

        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-400">
            Found {filteredContacts.length} contact
            {filteredContacts.length !== 1 ? "s" : ""} matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Contacts Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {contact.status}
                  </span>
                  <button className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">
                {contact.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{contact.company}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Mail className="h-3 w-3" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Phone className="h-3 w-3" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="h-3 w-3" />
                  <span>{contact.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Last contact: {contact.lastContact}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContactAction("email", contact.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors duration-200"
                    title="Send email"
                  >
                    <Mail className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleContactAction("call", contact.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors duration-200"
                    title="Call"
                  >
                    <Phone className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr className="text-left text-sm text-gray-300">
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Last Contact</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-white font-medium">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {contact.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{contact.company}</td>
                    <td className="p-4 text-gray-300">{contact.email}</td>
                    <td className="p-4 text-gray-300">{contact.phone}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contact.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{contact.lastContact}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleContactAction("email", contact.id)
                          }
                          className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
                          title="Send email"
                        >
                          <Mail className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() =>
                            handleContactAction("call", contact.id)
                          }
                          className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
                          title="Call"
                        >
                          <Phone className="h-3 w-3" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200">
                          <MoreHorizontal className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-white mb-2">
            No contacts found
          </h3>
          <p className="text-gray-400 mb-4">
            {searchQuery
              ? `No contacts match "${searchQuery}"`
              : "Start by adding your first contact"}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Add Contact
          </button>
        </div>
      )}
    </div>
  );
};

export default Contacts;
