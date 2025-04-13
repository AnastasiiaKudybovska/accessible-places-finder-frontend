import { useState } from 'react';
import { Box, Chip, Typography, Divider, Rating, Button, Modal, TextField } from '@mui/material';
import tagColors from '../../config/tagColors';

const PlacePopup = ({ place, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const accessibilityRating = place.rating?.accessibility || 0;
  const comments = place.comments || ['Коментарі відсутні'];

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(place.id, newComment);
      setNewComment('');
      setOpenModal(false);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="subtitle1" gutterBottom>
        {place.tags?.name || 'Місце без назви'}
      </Typography>
      
       {/* Tags section */}
            <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {place.tags?.wheelchair === 'yes' && (
                    <Chip 
                      label="Доступність" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Доступність'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.toilets_wheelchair === 'yes' && (
                    <Chip 
                      label="Туалет" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Туалет'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.tactile_paving === 'yes' && (
                    <Chip 
                      label="Тактильні" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Тактильні'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.tourism === 'hotel' && (
                    <Chip 
                      label="Готель" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Готель'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.amenity === 'restaurant' && (
                    <Chip 
                      label="Ресторан" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Ресторан'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.amenity === 'cafe' && (
                    <Chip 
                      label="Кафе" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Кафе'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.amenity === 'fast_food' && (
                    <Chip 
                      label="Фастфуд" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Фастфуд'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.amenity === 'bank' && (
                    <Chip 
                      label="Банк" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Банк'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.office === 'diplomatic' && (
                    <Chip 
                      label="Посольство" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Посольство'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.tourism === 'hostel' && (
                    <Chip 
                      label="Хостел" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Хостел'], color: 'white' }} 
                    />
                  )}
                  {place.tags?.amenity === 'pharmacy' && (
                    <Chip 
                      label="Аптека" 
                      size="small" 
                      sx={{ backgroundColor: tagColors['Аптека'], color: 'white' }} 
                    />
                  )}
            </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Оцінка доступності: {accessibilityRating.toFixed(1)}
        </Typography>
        <Rating 
          value={accessibilityRating} 
          readOnly 
          precision={0.5}
          sx={{ color: tagColors['Доступність'] }}
        />
      </Box>
      
      {/* Comments section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Коментарі:
        </Typography>
        <Box sx={{ 
          maxHeight: 150, 
          overflowY: 'auto', 
          p: 1, 
          border: '1px solid #eee', 
          borderRadius: 1,
          bgcolor: '#f9f9f9',
          mb: 2
        }}>
          {comments.map((comment, index) => (
            <Box key={index} sx={{ 
              mb: 1, 
              pb: 1, 
              borderBottom: index < comments.length - 1 ? '1px solid #eee' : 'none' 
            }}>
              <Typography variant="body2" sx={{ 
                fontStyle: comment === 'Коментарі відсутні' ? 'italic' : 'normal' 
              }}>
                {comment}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Add comment button at the bottom */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained"
          size="small"
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: 'var( --primary-color)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'var(--button-hover-color)',
            }
          }}
        >
          Додати коментар
        </Button>
      </Box>

      {/* Add comment modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ 
          width: 400, 
          bgcolor: 'background.paper', 
          p: 3, 
          borderRadius: 1,
          outline: 'none'
        }}>
          <Typography variant="h6" gutterBottom>
            Додати коментар
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Введіть ваш коментар..."
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button 
              onClick={() => setOpenModal(false)}
              sx={{ color: ' var(  --main-text-color)' }}
            >
              Скасувати
            </Button>
            <Button 
              variant="contained" 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'var(--button-hover-color)',
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                }
              }}
            >
              Додати
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PlacePopup;