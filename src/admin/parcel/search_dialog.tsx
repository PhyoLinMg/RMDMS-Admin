import React from 'react';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchParams: SearchParams) => void;
}

export interface SearchParams {
  roomNumber: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose, onSearch }) => {
  const [searchParams, setSearchParams] = React.useState<SearchParams>({
    roomNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Advanced Search</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={searchParams.roomNumber}
                  onChange={(e) => setSearchParams({...searchParams, roomNumber: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;