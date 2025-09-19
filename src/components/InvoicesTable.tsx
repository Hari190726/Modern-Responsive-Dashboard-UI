import React from 'react';
import { MoreHorizontal, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';

interface InvoicesTableProps {
  searchQuery?: string;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ searchQuery = '' }) => {
  const invoices = [
  {
    id: '001423',
    customer: 'Kumariii',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '31 Aug 2023',
    amount: '₹3,230.20',
    status: 'Paid',
    statusColor: 'bg-green-500',
    email: 'kumarii.@example.com'
  },
  {
    id: '004533',
    customer: 'pradeep',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '30 Aug 2023',
    amount: '₹5,630.50',
    status: 'Unpaid',
    statusColor: 'bg-yellow-500',
    email: 'pradeep.@example.com'
  },
  {
    id: '001784',
    customer: 'Gunalan',
    avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '30 Aug 2023',
    amount: '₹4,230.00',
    status: 'Paid',
    statusColor: 'bg-green-500',
    email: 'Guna.@example.com'
  },
  {
    id: '001515',
    customer: 'Dharshini',
    avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '29 Aug 2023',
    amount: '₹3,082.40',
    status: 'Paid',
    statusColor: 'bg-green-500',
    email: 'Dharshini.@example.com'
  },
];


  const [statusFilter, setStatusFilter] = React.useState<'all' | 'paid' | 'unpaid'>('all');
  const [selectedInvoices, setSelectedInvoices] = React.useState<string[]>([]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = searchQuery === '' || 
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      invoice.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleInvoiceAction = (action: string, invoiceId: string) => {
    console.log(`${action} invoice:`, invoiceId);
  };

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedInvoices(
      selectedInvoices.length === filteredInvoices.length 
        ? [] 
        : filteredInvoices.map(invoice => invoice.id)
    );
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Invoices</h3>
          <p className="text-sm text-gray-400">
            {filteredInvoices.length} of {invoices.length} invoices
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'paid' | 'unpaid')}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          <button 
            onClick={() => console.log('Export invoices')}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedInvoices.length > 0 && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-400">
              {selectedInvoices.length} invoice{selectedInvoices.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors duration-200">
                Mark as Paid
              </button>
              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors duration-200">
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-3 font-medium w-8">
                <input
                  type="checkbox"
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="pb-3 font-medium">Customer name</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Product ID</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Option</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="group hover:bg-gray-700/50 transition-colors duration-200">
                <td className="py-4">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelectInvoice(invoice.id)}
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={invoice.avatar}
                      alt={invoice.customer}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-white font-medium">{invoice.customer}</div>
                      <div className="text-xs text-gray-400">{invoice.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-300">{invoice.date}</td>
                <td className="py-4 text-white font-medium">{invoice.amount}</td>
                <td className="py-4 text-gray-300">{invoice.id}</td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => handleInvoiceAction('view', invoice.id)}
                      className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-600 transition-colors duration-200"
                      title="View invoice"
                    >
                      <Eye className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => handleInvoiceAction('edit', invoice.id)}
                      className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-600 transition-colors duration-200"
                      title="Edit invoice"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => handleInvoiceAction('delete', invoice.id)}
                      className="text-gray-400 hover:text-red-400 p-1 rounded-md hover:bg-gray-600 transition-colors duration-200"
                      title="Delete invoice"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <button className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-600 transition-colors duration-200">
                      <MoreHorizontal className="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredInvoices.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-white mb-2">No invoices found</h3>
            <p className="text-gray-400">
              {searchQuery ? `No invoices match "${searchQuery}"` : 'No invoices match the current filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesTable;