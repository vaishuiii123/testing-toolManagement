export default function VendorQuestionnaireSection() {
  return (
    <div>
      <h3 className="font-bold mb-2">Section 3: Vendor Questionnaire</h3>

      {/* Questionnaire Subsection */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Questionnaire Section</h4>
        <table className="table-auto w-full border-collapse border text-sm">
          <thead>
            <tr>
              <th className="border p-2">Question</th>
              <th className="border p-2">Answer</th>
              <th className="border p-2">Evidence Upload</th>
              <th className="border p-2">Owner</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Does the tool store client data?</td>
              <td className="border p-2">
                <textarea className="w-full border p-2 rounded" placeholder="Enter response" />
              </td>
              <td className="border p-2">
                <input type="file" className="w-full text-sm" />
              </td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded" placeholder="Owner name" />
              </td>
              <td className="border p-2">
                <select className="w-full border p-2 rounded">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                Is the tool SOC / ISO compliant? If yes, attach report.
              </td>
              <td className="border p-2">
                <textarea className="w-full border p-2 rounded" placeholder="Enter response" />
              </td>
              <td className="border p-2">
                <input type="file" className="w-full text-sm" />
              </td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded" placeholder="Owner name" />
              </td>
              <td className="border p-2">
                <select className="w-full border p-2 rounded">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* NDA Subsection */}
      <div>
        <h4 className="font-semibold mb-2">NDA Section</h4>
        <table className="table-auto w-full border-collapse border text-sm">
          <thead>
            <tr>
              <th className="border p-2">Document</th>
              <th className="border p-2">Date of Signature</th>
              <th className="border p-2">Validity</th>
              <th className="border p-2">Format of NDA</th>
              <th className="border p-2">Signed NDA</th>
              <th className="border p-2">Signer Company</th>
              <th className="border p-2">Owner</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">NDA</td>
              <td className="border p-2">
                <input type="date" className="border p-1 w-full rounded" />
              </td>
              <td className="border p-2 flex gap-1 items-center">
                <input type="date" className="border p-1 w-full rounded" />
                <span className="px-1">&rarr;</span>
                <input type="date" className="border p-1 w-full rounded" />
              </td>
              <td className="border p-2">
                <input type="file" className="w-full text-sm" />
              </td>
              <td className="border p-2">
                <input type="file" className="w-full text-sm" />
              </td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded" placeholder="Signer company" />
              </td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded" placeholder="Owner name" />
              </td>
              <td className="border p-2">
                <select className="w-full border p-2 rounded">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
