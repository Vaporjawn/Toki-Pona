import React, { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Tab,
  Tabs,
  Badge,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Lock as LockIcon,
  Info as InfoIcon,
  Share as ShareIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../hooks/useProgress';
import {
  achievements,
  getAchievementsByCategory,
  isAchievementUnlocked,
  getAchievementProgress,
  getRarityColor,
  getRarityGradient
} from '../data/achievements';
import type { Achievement, UserStats } from '../data/achievements';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`achievement-tabpanel-${index}`}
      aria-labelledby={`achievement-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AchievementCard: React.FC<{
  achievement: Achievement;
  userStats: UserStats;
  onDetails: (achievement: Achievement) => void;
}> = ({ achievement, userStats, onDetails }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isUnlocked = isAchievementUnlocked(achievement, userStats);
  const progress = getAchievementProgress(achievement, userStats);
  const rarityColor = getRarityColor(achievement.rarity);
  const rarityGradient = getRarityGradient(achievement.rarity);

  return (
    <Card
      sx={{
        position: 'relative',
        background: isUnlocked
          ? rarityGradient
          : `linear-gradient(135deg, ${alpha(theme.palette.grey[500], 0.3)} 0%, ${alpha(theme.palette.grey[600], 0.3)} 100%)`,
        border: isUnlocked ? `2px solid ${rarityColor}` : `2px solid ${theme.palette.grey[400]}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${alpha(rarityColor, 0.3)}`,
        },
        opacity: achievement.isSecret && !isUnlocked ? 0.6 : 1,
        minHeight: 280
      }}
      onClick={() => onDetails(achievement)}
    >
      {/* Rarity Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2
        }}
      >
        <Chip
          label={t(`achievements.rarity.${achievement.rarity}`)}
          size="small"
          sx={{
            background: rarityColor,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.7rem'
          }}
        />
      </Box>

      {/* Lock overlay for secret achievements */}
      {achievement.isSecret && !isUnlocked && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.common.black, 0.6),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            borderRadius: 1
          }}
        >
          <LockIcon sx={{ fontSize: 48, color: 'white', opacity: 0.8 }} />
        </Box>
      )}

      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
        <Stack spacing={2} sx={{ height: '100%' }}>
          {/* Achievement Icon and Status */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                fontSize: '1.5rem',
                background: isUnlocked ? 'transparent' : alpha(theme.palette.grey[500], 0.3),
                border: `2px solid ${isUnlocked ? rarityColor : theme.palette.grey[400]}`,
              }}
            >
              {achievement.isSecret && !isUnlocked ? '🔒' : achievement.icon}
            </Avatar>

            <Stack direction="row" spacing={1}>
              {isUnlocked && (
                <Tooltip title={t('achievements.unlocked')}>
                  <TrophyIcon sx={{ color: rarityColor, fontSize: 24 }} />
                </Tooltip>
              )}
              {achievement.isSecret && (
                <Tooltip title={t('achievements.secret')}>
                  <StarIcon sx={{ color: theme.palette.warning.main, fontSize: 20 }} />
                </Tooltip>
              )}
            </Stack>
          </Stack>

          {/* Title and Description */}
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: isUnlocked ? 'white' : theme.palette.text.primary,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                lineHeight: 1.2
              }}
            >
              {achievement.isSecret && !isUnlocked ? t('achievements.secret_title') : t(achievement.title)}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary,
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {achievement.isSecret && !isUnlocked ? t('achievements.secret_description') : t(achievement.description)}
            </Typography>
          </Stack>

          {/* Progress Bar */}
          {!isUnlocked && (
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500
                  }}
                >
                  {t('achievements.progress')}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold'
                  }}
                >
                  {Math.round(progress)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.grey[300], 0.3),
                  '& .MuiLinearProgress-bar': {
                    background: rarityGradient,
                    borderRadius: 3
                  }
                }}
              />
            </Stack>
          )}

          {/* Reward Info */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body2"
                sx={{
                  color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary,
                  fontWeight: 'bold'
                }}
              >
                +{achievement.reward.xp} XP
              </Typography>
              {achievement.reward.badge && (
                <Chip
                  label={achievement.reward.badge}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.65rem',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1
                    },
                    color: isUnlocked ? 'white' : theme.palette.text.secondary,
                    borderColor: isUnlocked ? alpha('#ffffff', 0.7) : alpha(theme.palette.grey[400], 0.7)
                  }}
                />
              )}
            </Stack>

            <IconButton
              size="small"
              sx={{
                color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: alpha(rarityColor, 0.1)
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                onDetails(achievement);
              }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AchievementDetailDialog: React.FC<{
  achievement: Achievement | null;
  userStats: UserStats;
  open: boolean;
  onClose: () => void;
}> = ({ achievement, userStats, open, onClose }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!achievement) return null;

  const isUnlocked = isAchievementUnlocked(achievement, userStats);
  const progress = getAchievementProgress(achievement, userStats);
  const rarityColor = getRarityColor(achievement.rarity);
  const rarityGradient = getRarityGradient(achievement.rarity);

  const handleShare = () => {
    if (navigator.share && isUnlocked) {
      navigator.share({
        title: t('achievements.share_title'),
        text: t('achievements.share_text', {
          title: t(achievement.title),
          badge: achievement.reward.badge || ''
        }),
        url: window.location.origin
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: isUnlocked ? rarityGradient : theme.palette.background.paper,
          border: `2px solid ${rarityColor}`,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: '1.2rem',
              background: 'transparent',
              border: `2px solid ${rarityColor}`,
            }}
          >
            {achievement.isSecret && !isUnlocked ? '🔒' : achievement.icon}
          </Avatar>

          <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: isUnlocked ? 'white' : theme.palette.text.primary,
                fontWeight: 'bold'
              }}
            >
              {achievement.isSecret && !isUnlocked ? t('achievements.secret_title') : t(achievement.title)}
            </Typography>
            <Chip
              label={t(`achievements.rarity.${achievement.rarity}`)}
              size="small"
              sx={{
                background: rarityColor,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                width: 'fit-content'
              }}
            />
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Typography
            variant="body1"
            sx={{
              color: isUnlocked ? alpha('#ffffff', 0.95) : theme.palette.text.primary,
              lineHeight: 1.6
            }}
          >
            {achievement.isSecret && !isUnlocked ? t('achievements.secret_description') : t(achievement.description)}
          </Typography>

          {!isUnlocked && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                  {t('achievements.progress')}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {Math.round(progress)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.grey[300], 0.3),
                  '& .MuiLinearProgress-bar': {
                    background: rarityGradient,
                    borderRadius: 4
                  }
                }}
              />
            </Box>
          )}

          <Divider sx={{ borderColor: alpha(rarityColor, 0.3) }} />

          <Stack spacing={2}>
            <Typography variant="h6" sx={{ color: isUnlocked ? 'white' : theme.palette.text.primary }}>
              {t('achievements.rewards')}
            </Typography>

            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary }}>
                  {t('achievements.experience')}:
                </Typography>
                <Chip
                  label={`+${achievement.reward.xp} XP`}
                  size="small"
                  sx={{
                    background: alpha(theme.palette.success.main, 0.2),
                    color: theme.palette.success.main,
                    fontWeight: 'bold'
                  }}
                />
              </Stack>

              {achievement.reward.badge && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary }}>
                    {t('achievements.badge')}:
                  </Typography>
                  <Chip
                    label={achievement.reward.badge}
                    size="small"
                    sx={{
                      background: rarityColor,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </Stack>
              )}

              {achievement.reward.title && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary }}>
                    {t('achievements.title')}:
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: isUnlocked ? 'white' : theme.palette.text.primary,
                    fontWeight: 'bold'
                  }}>
                    {achievement.reward.title}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>

          {!achievement.isSecret && (
            <>
              <Divider sx={{ borderColor: alpha(rarityColor, 0.3) }} />

              <Stack spacing={1}>
                <Typography variant="h6" sx={{ color: isUnlocked ? 'white' : theme.palette.text.primary }}>
                  {t('achievements.requirement')}
                </Typography>
                <Typography variant="body2" sx={{ color: isUnlocked ? alpha('#ffffff', 0.9) : theme.palette.text.secondary }}>
                  {t(`achievements.requirements.${achievement.requirement.type}`, { value: achievement.requirement.value })}
                </Typography>
              </Stack>
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t('common.close')}
        </Button>

        {'share' in navigator && isUnlocked && (
          <Button
            startIcon={<ShareIcon />}
            onClick={handleShare}
            sx={{ color: 'white' }}
          >
            {t('achievements.share')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const AchievementsPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { state } = useProgress();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Convert progress state to UserStats format
  const userStats: UserStats = useMemo(() => ({
    practiceCount: 0, // TODO: Add practice session counting to ProgressState
    wordsMastered: state.userProgress.vocabularyMastered.length,
    currentStreak: state.userProgress.currentStreak,
    bestSpeed: 0, // TODO: Add speed tracking to ProgressState
    lastSessionAccuracy: 0, // TODO: Add session accuracy tracking to ProgressState
    weeklyAccuracy: 0, // TODO: Add weekly accuracy tracking to ProgressState
    overallAccuracy: 0, // TODO: Add overall accuracy tracking to ProgressState
    totalXP: state.userProgress.totalXP,
    lessonsCompleted: state.userProgress.lessonsProgress.filter((l) => l.completed).length,
    dictionaryViews: 0 // TODO: Add dictionary view tracking to ProgressState
  }), [state.userProgress]);

  // Filter and organize achievements
  const unlockedCount = achievements.filter(a => isAchievementUnlocked(a, userStats)).length;
  const totalCount = achievements.filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))).length;

  const categorizedAchievements = {
    all: achievements.filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))),
    practice: getAchievementsByCategory('practice').filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))),
    vocabulary: getAchievementsByCategory('vocabulary').filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))),
    streak: getAchievementsByCategory('streak').filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))),
    speed: getAchievementsByCategory('speed').filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))),
    mastery: getAchievementsByCategory('mastery').filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats))),
    exploration: getAchievementsByCategory('exploration').filter(a => !(a.isSecret && !isAchievementUnlocked(a, userStats)))
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAchievementDetails = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setDetailDialogOpen(true);
  };

  const handleExportAchievements = () => {
    const unlockedAchievements = achievements.filter(a => isAchievementUnlocked(a, userStats));
    const exportData = {
      unlockedCount,
      totalCount: achievements.length,
      unlockedAchievements: unlockedAchievements.map(a => ({
        id: a.id,
        title: t(a.title),
        description: t(a.description),
        category: a.category,
        rarity: a.rarity,
        unlockedAt: new Date().toISOString()
      })),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toki-pona-achievements-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabLabels = ['all', 'practice', 'vocabulary', 'streak', 'speed', 'mastery', 'exploration'];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Page Header */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
              {t('achievements.title')}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              {t('achievements.subtitle')}
            </Typography>
          </Stack>

          <Button
            startIcon={<DownloadIcon />}
            onClick={handleExportAchievements}
            variant="outlined"
            sx={{ mt: 1 }}
          >
            {t('achievements.export')}
          </Button>
        </Stack>

        {/* Achievement Overview Stats */}
        <Alert
          severity="info"
          icon={<TrophyIcon />}
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {t('achievements.overview', { unlocked: unlockedCount, total: totalCount })}
            {unlockedCount > 0 && (
              <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
                {t('achievements.completion_rate', {
                  percentage: Math.round((unlockedCount / totalCount) * 100)
                })}
              </Typography>
            )}
          </Typography>
        </Alert>
      </Stack>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={label}
              label={
                <Badge
                  badgeContent={categorizedAchievements[label as keyof typeof categorizedAchievements]?.filter(a => isAchievementUnlocked(a, userStats)).length || 0}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.6rem',
                      height: 16,
                      minWidth: 16
                    }
                  }}
                >
                  {t(`achievements.categories.${label}`)}
                </Badge>
              }
              id={`achievement-tab-${index}`}
              aria-controls={`achievement-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Achievement Lists */}
      {tabLabels.map((label, index) => (
        <TabPanel key={label} value={activeTab} index={index}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 3,
              pb: 2
            }}
          >
            {categorizedAchievements[label as keyof typeof categorizedAchievements]?.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                userStats={userStats}
                onDetails={handleAchievementDetails}
              />
            ))}
          </Box>

          {categorizedAchievements[label as keyof typeof categorizedAchievements]?.length === 0 && (
            <Stack spacing={2} alignItems="center" sx={{ py: 6 }}>
              <TrophyIcon sx={{ fontSize: 48, color: theme.palette.grey[400] }} />
              <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                {t('achievements.no_achievements')}
              </Typography>
            </Stack>
          )}
        </TabPanel>
      ))}

      {/* Achievement Detail Dialog */}
      <AchievementDetailDialog
        achievement={selectedAchievement}
        userStats={userStats}
        open={detailDialogOpen}
        onClose={() => {
          setDetailDialogOpen(false);
          setSelectedAchievement(null);
        }}
      />
    </Box>
  );
};

export default AchievementsPage;